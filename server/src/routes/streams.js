
const express = require('express'),
    router = express.Router();
import User from '../models/User';

router.get('/info',

    (req, res) => {
//	console.log("hello");
//	res.json();   
     if (req.query.streams) {
            let streams = JSON.parse(req.query.streams);
            let query = { $or: [] };
            for (let stream in streams) {
                if (!streams.hasOwnProperty(stream)) continue;
                query.$or.push({ stream_key: stream });
            }
//	    console.log(User);
            User.find(query, (err, users) => {
                if (err)
                    return;
                if (users) {
                    res.json(users);
                }
            });
        }
    }),
router.get('/user',

    (req, res) => {
        if (req.query.username) {
            let username = req.query.username;
            let query = { username: req.query.username };
            User.findOne(query, (err, users) => {
                if (err)
                    return;
                if (users) {
		  // console.log(users);
                    res.json({stream_key: users.stream_key});
                }
            });
        }
    });
module.exports = router;

