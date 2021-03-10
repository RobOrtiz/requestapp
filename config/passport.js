// const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
// const djSchema = require('../models/dj');

// // Configuring passport with local strategy
// // This is where we verify the djSchema with incoming requests
// passport.use(new LocalStrategy(djSchema.authenticate()));

// // Since we are using sessions to track our dj logins, 
// // we need to serialize and deserialize users.
// passport.serializeUser(djSchema.serializeUser());
// passport.deserializeUser(djSchema.deserializeUser());

// module.exports = passport;