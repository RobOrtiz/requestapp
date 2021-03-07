const db = require("../models");
const passport = require("../config/passport");

// Require in mongodb to use ObjectId to pass the current Dj ObjectId into findByIdAndUpdate Update call.
// TEchnically I could have just used the text portion of the ObjectId and it would have still worked. 
// Do it this way until we figure out another way to do it. Is this the right way or best practice, who knows! 
const ObjectId = require('mongodb').ObjectID;

// Defining methods for the djController
module.exports = {

  // New DJ signup
  create: function (req, res) {
    db.Dj
      .register(req.body, req.body.password)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // New Event signup for Dj.
  // After the new event is created we then find the Dj by ObjectId and push the new Event _id to the events array in the Dj document.
  // Const djIdToUpdate links to ObjectId of one of the Djs in the DB as a test to see if the update Events works 
  // after the create Event POST. This will be used until we figure out how to grab the ObjectId of
  // the Dj who logs in and set it so it can be used throughout the app to update the Dj Events and requests.
  // I used findByIdAndUpdate versus findOneAndReplace. They both do the same thing.
  // You need to explicitly set the new option to true to get the new version of the doc, after the update is applied.
  // Probably can get away with leaving new set to default of false, unless we plan on displaying the updated data after the update.
  create: function (req, res) {
    const djIdToUpdate = ObjectId("60448e99dd4d915f4cc8ad48");
    db.Event
      .create(req.body)
      .then(({ _id }) => db.Dj.findByIdAndUpdate({ _id: djIdToUpdate }, { $push: { events: _id } }, { new: true }))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  login: function (req, res) {
    passport.authenticate('local')(req, res, function () {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    })
  },

  deleteMany: function (req, res) {
    db.Dj
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.deleteMany())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}