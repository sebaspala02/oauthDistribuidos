const express = require('express');
const router = express.Router();
var request = require('request');
const passport = require('passport');
const mongoose = require('mongoose');


var loggedin = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login.ejs');
    }
};

router.get('/', (req, res, next) => {
    res.render('index.ejs');
});

//auth logout
router.get('/logout', (req, res, next) => {
    res.send('/');
});



//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile');
});

router.get('/login', (req, res, next) => {
    res.render('login.ejs');
});

router.get('/loginFacebook', (req, res, next) => {
    res.render('loginFacebook.ejs');
});

router.get('/indexLogeado', (req, res, next) => {
    res.render('indexLogeado.ejs');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

const authCheck = (req, res, next) => {
    if (!req.user) {
        //si el usuario no esta loggeado
        res.redirect('auth/login');
    } else {
        next();
    }
}

router.get('/', authCheck, (req, res, next) => {
    res.render('profile.ejs', { user: req.user });
});

//Cambios para local con funcion loggedin
router.get('/profile', (req, res, next) => {
    res.render(req.session);
});

router.get('/indexLogeado#carousel', (req, res, next) => {
    res.render('indexLogeado#carousel.ejs');
});

router.get('/votar', (req, res, next) => {
    res.render('votar.ejs');
});

router.get('/selectCiudad', (req, res, next) => {
    res.render('selectCiudad.ejs');
});

router.get('/accionVotar', (req, res, next) => {
    res.render('accionVotar.ejs');
});

router.get('/accionVOTADA', (req, res, next) => {
    res.render('accionVOTADA.ejs');
});

router.get('/publicarFoto', (req, res, next) => {
    res.render('publicarFoto.ejs');
});

router.get('/CRUD_evento', (req, res, next) => {
    res.render('CRUD_evento.ejs');
});

router.get('/CRUD_restaurante', (req, res, next) => {
    res.render('CRUD_restaurante.ejs');
});

module.exports = router;