const db = require("../models");

// Require in mongodb to use ObjectId to pass the current Dj ObjectId into findByIdAndUpdate Update call.
// TEchnically I could have just used the text portion of the ObjectId and it would have still worked.
// Do it this way until we figure out another way to do it. Is this the right way or best practice, who knows!
const ObjectId = require("mongodb").ObjectID;

// Defining methods for the djController
module.exports = {
  // New DJ signup
  createDj: function (req, res) {
    db.Dj
      // .register(req.body, req.body.password)
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByIdDj: function (req, res) {
    db.Dj.findById({ userSub: req.params.userSub })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Dj.find(req.query)
      .populate("events")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // This takes the djid from request, finds the active event
  // and puts the song request in the event
  createRequest: function (req, res) {
    db.Dj.findById(req.body._id)
      .populate({
        path: "events",
        match: { eventStatus: "activated" },
      })
      .then(res => insertRequest(res.events[0]._id))
      .catch((err) => console.log(err));
    
    function insertRequest(eventId) {
    db.Event.findOneAndUpdate(
      { _id: eventId },
      {
        $push: {
          requestList: {
            customerName: req.body.fullName,
            title: req.body.title,
            artist: req.body.artist,
            generalRequest: req.body.generalRequest,
            playNow: req.body.playNow,
            tip: req.body.tip,
          },
        },
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  }
},

  findEventById: function (req, res) {
    db.Dj.findById(req.params.id)
      .populate({
        path: "events",
        match: { eventStatus: "activated" },
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  createEvent: function (req, res) {
    db.Event.create(req.body)
      .then(({ _id }) =>
        db.Dj.findByIdAndUpdate(
          { _id: req.body.djId },
          { $push: { events: _id } },
          { new: true }
        )
      )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  deleteMany: function (req, res) {
    db.Dj.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.deleteMany())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
