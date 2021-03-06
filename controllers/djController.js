const db = require("../models");
const passport = require("../config/passport");

// Defining methods for the djController
module.exports = {
  // New DJ signup
  create: function(req, res) {
    db.Dj
    .register(req.body, req.body.password)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  login: function(req, res) { 
    passport.authenticate('local')(req, res, function () {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    })
  },
  deleteMany: function(req, res) {
    db.Dj
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.deleteMany())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}