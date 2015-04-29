/**
 * Created by rramachandra on 2015-04-29.
 */
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./User.js');
//var config = require('../oauth.js');  // replace with your oauth
var config = require('../fboauth.js');

var init = function() {
    // config
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("profile: " + JSON.stringify(profile));
            return User.login(profile, {accessToken: accessToken, refreshToken: refreshToken}, done);
        }
    ));

    // serialize and deserialize
    passport.serializeUser(function(user, done) {
        //console.log('serializeUser: ' + user._id)
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            //console.log('Deserializer:' + JSON.stringify(user));
            if (!err) done(null, user);
            else done(err, null)
        })
    });

    return passport;
};

module.exports = init;
