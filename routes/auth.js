const express = require('express');
const router = express.Router();
const localUser = require('../models/localUser');

module.exports = function(passport) {
    router.post('/login', passport.authenticate('local', {
        failurreRedirect: '/login',
        successRedirect: '/profile'
    }), function(req, res) {
        res.send('login');
    });
    return router;
};