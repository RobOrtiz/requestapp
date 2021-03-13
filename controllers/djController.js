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
  // findByIdDj: function(req, res) {
  //   db.Dj
  //     .findById(req.params.userSub)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findByIdDj: function (req, res) {
    db.Dj.findById({ userSub: req.params.userSub })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    db.Dj.find(req.query)
      .populate({path: 'events', options: { sort: { 'eventDate': 1 } } })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // This one works
  // findAllEvents: function (req, res) {
  //   db.Event.find(req.query)
  //     .populate("events")
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },
  createRequest: function (req, res) {
    const eventId = "75bec5d-dbe1-736-fa0b-eb2618f2cca";
    db.Event
      .findOneAndUpdate(
        { _id: eventId },
        {
          $push: {
            requestList: {
              customerName: req.body.fullName,
              title: req.body.title,
              artist: req.body.artist,
              generalRequest: req.body.generalRequest,
              playNow: req.body.playNow,
              tip: req.body.tip
            },
          },
        }
      )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  },

  findEventById: function (req, res) {
    db.Dj.findById(req.params.id)
      .populate({
        path:'events', 
        match: {eventStatus: "activated"}
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // findActiveEvent: function (req, res) {
  //   console.log(req);
  //   db.Dj.findOne({ _id: req }, function (err) {
  //     var activeEvent = db.Dj.events.filter(function (activeEvent) {
  //       return activeEvent.eventStatus === "Activated";
  //     })
  //       .populate()
  //       .then((dbModel) => res.json(dbModel))
  //   })},
    



      // New Event signup for Dj.
      // After the new event is created we then find the Dj by ObjectId and push the new Event _id to the events array in the Dj document.
      // Const djIdToUpdate links to ObjectId of one of the Djs in the DB as a test to see if the update Events works
      // after the create Event POST. This will be used until we figure out how to grab the ObjectId of
      // the Dj who logs in and set it so it can be used throughout the app to update the Dj Events and requests.
      // I used findByIdAndUpdate versus findOneAndReplace. They both do the same thing.
      // You need to explicitly set the new option to true to get the new version of the doc, after the update is applied.
      // Probably can get away with leaving new set to default of false, unless we plan on displaying the updated data after the update.
      createEvent: function (req, res) {
        console.log(req)
        const djIdToUpdate = ObjectId("6047c790c27d34aa70378efe");
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
