const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const djSchema = require('../models/dj');

// Configuring passport with local strategy
// This is where we verify the djSchema with incoming requests
passport.use(new LocalStrategy(djSchema.authenticate()));

// Since we are using sessions to track our dj logins, 
// we need to serialize and deserialize users.
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