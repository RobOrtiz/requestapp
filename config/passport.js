const djSchema = require('../models/dj');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
// passport.use(djSchema.createStrategy());

passport.use(new LocalStrategy(djSchema.authenticate()));
passport.serializeUser(djSchema.serializeUser());
passport.deserializeUser(djSchema.deserializeUser());

module.exports = passport;
// var passport = require('passport')
// , LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
// function(username, password, done) {
//   User.findOne({ username: username }, function (err, user) {
//     if (err) { return done(err); }
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     if (!user.validPassword(password)) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   });
// }
// ));