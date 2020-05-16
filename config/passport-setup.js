const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exist in our DB
        User.findOne({ googleID: profile.id }).then((currentUser) => {
            if (currentUser) {
                //already have the user
                console.log('user is:', currentUser);
                done(null, currentUser);
            } else {
                //if not, create user in our DB
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
);