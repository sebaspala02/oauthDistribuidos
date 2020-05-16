const express = require('express');
const router = express.Router();
const localUser = require('../models/localUser');

module.exports = function(passport) {
    router.post('/signup', function(req, res) {
        var body = req.body,
            username = body.username,
            password = body.password;
        localUser.findOne({ username: username }, function(err, doc) {
            if (err) {
                res.status(500).send('error ocurred');
            } else {
                if (doc) {
                    res.status(500).send('Username already exists');
                } else {
                    var record = new localUser();
                    record.username = username;
                    record.password = record.hashPassword(password);
                    record.save(function(err, user) {
                        if (err) {
                            res.status(500).send('DB error');
                        } else {
                            res.send(user);
                        }
                    });
                }
            }
        });
    });
    router.post('/login', passport.authenticate('local', {
        failurreRedirect: '/login',
        successRedirect: '/profile'
    }), function(req, res) {
        res.send('hey');
    });
    return router;
};