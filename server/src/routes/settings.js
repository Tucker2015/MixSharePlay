const express = require('express'),
    router = express.Router(),
import User from '../models/User';
shortid = require('shortid');

router.get('/stream_key',
    (req, res) => {
        User.findOne({ email: req.user.email }, (err, user) => {
            if (!err) {
                res.json({
                    stream_key: user.stream_key,
                    username: user.username,
                    email: user.email
                })
            }
        });
    });

router.post('/stream_key',

    (req, res) => {

        User.findOneAndUpdate({
            email: req.user.email
        }, {
            stream_key: shortid.generate()
        }, {
            upsert: true,
            new: true,
        }, (err, user) => {
            if (!err) {
                res.json({
                    stream_key: user.stream_key
                })
            }
        });
    });


module.exports = router;