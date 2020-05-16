const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// const engine = require('pug');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const keys = require('./keys');

const bodyparser = require('body-parser');

const authRoutes = require('./routes/auth-routes');
const restaurantRoutes = require('./routes/restaurant-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const eventRoutes = require('./routes/event-routes');

require('./config/passport')(passport);

const auth = require('./routes/auth')(passport);

const app = express();
require('./database');
//require('./passport/local-auth');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/auth', auth);
app.use('/events', eventRoutes);

//create login route
//app.get('/', (req, res) => {
//    res.render('home');
//});

app.use(morgan('dev'));

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
}));

app.use('/', require('./routes/index'));
app.listen(process.env.port || 3000);
console.log('listening on port 3000');

module.exports = app;