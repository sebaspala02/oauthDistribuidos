const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        //si el usuario no esta loggeado
        res.redirect('auth/login');
    } else {
        next();
    }
}

router.get('/', (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;