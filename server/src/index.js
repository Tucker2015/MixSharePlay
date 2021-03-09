import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import passport from 'passport';
import all_routes from 'express-list-endpoints';
const config = require('./config/default');
const rooms = {}
import routes from './routes';
import User from './models/User';
import { seedDb } from './utils/seed';
const node_media_server = require('./media_server');
const thumbnail_generator = require('./cron/thumbnails');


const app = express();
var cors = require('cors');
app.use(cors());
// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/facebookStrategy');
require('./services/googleStrategy');
require('./services/localStrategy');

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
app.use('/public', express.static(join(__dirname, '../public')));
app.use('/streams', require('./routes/streams'));
app.use('/thumbnails', express.static(join(__dirname, './thumbnails')));

// Serve static assets if in production
if (isProduction) {
  // Set static folder
  app.use(express.static(join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../..', 'client', 'build', 'index.html')); // index is in /server/src so 2 folders up
  });

  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;

  const httpsOptions = {
    key: readFileSync(resolve(__dirname, '../security/cert.key')),
    cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
  };

  const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log('https server running at ' + port);
    console.log(all_routes(app));
  });
  const io = require('socket.io')(server, {
    // "force new connection": true,
    // "reconnectionAttempts": "infinity",
    // "timeout": 10000,
    // "transports": ["websocket"],
    // cors: {
    //   origin: "https://live.mixshare.co.uk",
    //   methods: ["GET", "POST"]
    // }
  });
  io.on('connection', socket => {

    socket.on('join-room', (room, user) => {
      socket.join(room)
      if (rooms[room] != null) {
        if (rooms[room].users[socket.id])
          socket.emit('getRoom', rooms[room])
        else {
          rooms[room].users[socket.id] = user;
          socket.emit('getRoom', rooms[room])
        }
      }
      else {
        rooms[room] = { users: {}, messages: [], views:{} }
        rooms[room].users[socket.id] = user;
        socket.emit('getRoom', rooms[room])
      }

    });
    socket.on('join-room-without-login', (room) => {
      if (rooms[room] != null) {
        socket.emit('getRoom', rooms[room])
      }
      else {
        console.log("not found")
      }
    });
    socket.on('new-user', (room, name) => {

      socket.join(room)
      socket.to(room).broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', (room, msg) => {
      rooms[room].messages.push(msg);
      console.log(rooms[room].messages)
      console.log(room)
      socket.to(room).emit('chat-message', { message: rooms[room].messages, name: rooms[room].users[socket.id] })
    })
    socket.on('view-add-stream', (room) => {
      socket.join(room);

      if (rooms[room] != null) {
        rooms[room].views[socket.id] = socket.id;
      }
      else {
        rooms[room] = { users: {}, messages: [], views:{} }
        rooms[room].views[socket.id] = socket.id;
      }
      // socket.to(room).emit('live-view-update', Object.keys(rooms[room].views).length)
      socket.emit('live-view-update', rooms)
      socket.broadcast.emit('live-view-update', rooms)


    })
    socket.on('disconnect', () => {
      console.log(socket.id);
      console.log(rooms);
      for (const room in rooms) {
        delete rooms[room]['views'][socket.id];
      }
      console.log("AFTER DELETE")
      console.log(rooms);
      socket.emit('live-view-update', rooms)
      socket.broadcast.emit('live-view-update', rooms)
        

      // emit broadcasr with updated views count
      // socket.rooms.forEach(room => {
        
      //   delete rooms[room].users[socket.id]
      //   socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      // })
    })
  })
}
node_media_server.run();
thumbnail_generator.start();
