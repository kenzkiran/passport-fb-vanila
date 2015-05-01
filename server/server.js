/**
 * Nodejs server for facebook authentication
 * http://passportjs.org
 * Original code from: http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js/#.VUD7vGRViko
 * has been upgraded to use express 4.x
 * Replaced jade with a vanila javascript and html
 */
var config = require('./oauth.js');
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passportfb = require('./lib/passport-fb.js');
var User = require('./lib/User.js');
var MongoStore = require('connect-mongo')(session);
var app = express();

//init passport-fb
passportfb();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var mStore =  new MongoStore({url:'mongodb://localhost:27017/fb-vanilla-session'});
app.use(session({store: mStore, secret: 'my_precious', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


var staticFileOptions = {root: __dirname + '/public/'};

app.get('/success', ensureAuthenticated, function(req, res){
    User.findById(req.session.passport.user, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            res.sendFile('success.html', staticFileOptions);
        };
    });
});

app.get('/', function(req, res){
    res.sendFile('index.html', staticFileOptions);
});

app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: 'public_profile'}),
    function(req, res){
    });

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/success');
    });

app.get('/profile', ensureAuthenticated, function(req, res) {
    console.log("Profile requested");
    User.findById(req.session.passport.user, function(err, user) {
        if(err) {
            res.json(500, {err: 'User Not found'});
        } else {
            res.json({name: user.name});
        }
    });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



// port
app.listen(3000);

// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}
