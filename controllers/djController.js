const db = require("../models");

// Defining methods for the djController
module.exports = {
  create: function(req, res) {
    db.Dj
    .register(req.body, req.body.password)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  // create: function(req, res) {
  //   db.Dj
  //   .create(req.body)
  //   .then(dbModel => res.json(dbModel))
  //   .catch(err => res.status(422).json(err));
  // },
  deleteMany: function(req, res) {
    db.Dj
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.deleteMany())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}