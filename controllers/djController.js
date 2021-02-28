const db = require("../models");

// Defining methods for the djController
module.exports = {
  create: function(req, res) {
    db.Dj
    .create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
}