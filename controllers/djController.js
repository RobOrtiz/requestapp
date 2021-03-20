const db = require("../models");

// Require in mongodb to use ObjectId to pass the current Dj ObjectId into findByIdAndUpdate Update call.
// TEchnically I could have just used the text portion of the ObjectId and it would have still worked.
// Do it this way until we figure out another way to do it. Is this the right way or best practice, who knows!
// const ObjectId = require("mongodb").ObjectID;

// Defining methods for the djController
module.exports = {

  // This is used to create new DJ profile page
  // Used by POST on djs.js router.route("/")
  createDj: function (req, res) {
    db.Dj
      // .register(req.body, req.body.password)
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // We are not using this controller/route
  // findByIdDj: function (req, res) {
  //   db.Dj.findById({ userSub: req.params.userSub })
  //     .then((dbModel) => res.json(dbModel))
  //     .catch((err) => res.status(422).json(err));
  // },

  // This is used to find activated and deactivated Events for a Dj - sorts in ascending order
  // It does not retrieve the events that have ended.
  // Used by GET on djs.js router.route("/")
  findAll: function (req, res) {
    db.Dj.find(req.query)
      .populate({
        path: 'events',
        match: { $or: [ 
          { eventStatus: "activated"},
          { eventStatus: "deactivated"}
        ]},
        options: {
          sort: { 'eventDate': 1 }
        }
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // This takes the djid from request, finds the active event
  // and puts the song request in the event
  // Used by PUT on djs.js router.route("/event")
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
              albumCover: req.body.albumCover,
              customerName: req.body.fullName,
              title: req.body.title,
              artist: req.body.artist,
              generalRequest: req.body.generalRequest,
              playNow: req.body.playNow,
              tip: req.body.tip,
              songStatus: req.body.songStatus,
            },
          },
        }
      )
        .then((dbModel) => res.json(dbModel))
        .catch((err) => console.log(err));
    }
  },

  // This is used to change the songStatus as the song request is moving around the request queue.
  // Used by PUT on djs.js router.route("/requests")
  findSongById: function (req, res) {
    db.Event.findOneAndUpdate(
      { requestList: { $elemMatch: { "_id": req.body.songId } } },
      {
        $set: {
          "requestList.$.songStatus": req.body.newSongStatus,
          "requestList.$.queueOrderNumber": req.body.addQueueNumber,
          "requestList.$.timeUpdatedAt" : new Date(),
        }
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  },

  // This is used to change the eventStatus when the user clicks on the activate or deactivate switch on the event card.
  // Used by PUT on djs.js route: router.route("/eventstatus")
  updateEventStatus: function (req, res) {
    db.Event.findOneAndUpdate(
      { "subIdForEventStatusChange": req.body.eventSubIdToChange },
      { eventStatus: req.body.changeStatusTo },
      { new: true }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  },

  // This is used to find the Event with eventStatus of activated - for the request page during the event.
  // Used by GET on djs.js router.route("/event/:id")
  findEventById: function (req, res) {
    db.Dj.findById(req.params.id)
      .populate({
        path: "events",
        match: { eventStatus: "activated" },
      })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // This is used to add a new Event on the DJ dashboard.
  // Used by POST on djs.js router.route("/event")
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

  // Count occurences of different songStatus in requestList
  // Used by GET on djs.js router.route("/requests/:id")
  countSongStatuses: function (req, res) {
    db.Event.aggregate([

      // Limit matching documents (can take advantage of index)
      // Find the activated event via the eventId
      {
        $match: {
          _id: req.params.id
        }
      },

      // This is the to unwind the requestList and then the songStatus to get the occurrences of each
      // However it was returning the correct counts but they were all called "queue".
      // I put a question on stackoverflow.
      // In the mean time I commented out this code and have a workout to count the occurrences in the request page.
      // Unpack the requestList and songStatuses
      { $unwind: "$requestList" },
      { $unwind: "$requestList.songStatus" },

      // Group by the answer values
      // This works differently than designed with the $unwinds commented out above.
      // Inside it provides an array for each songStatus in the requestList.
      // On the request page I should count them with an if statement in a for loop.
      // Not sure why this is working like it should. 
      {
        $group: {
          _id: {
            songType: "$requestList.songStatus",
            tipAmount: "$requestList.tip"
          },
          count: { 
            $sum: 1 
          }
        }
      }])
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  updateQueueNumber: function (req, res) {
    db.Event.findOneAndUpdate(
      { requestList: { $elemMatch: { "_id": req.params.id} } },
      {
        $set: {
          "requestList.$.queueOrderNumber": req.body.newQueueNumber,
        }
      }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  },

  // This was set up to be used with seeded data when we first started the project.
  // It deleted the old data and added the new data.
  deleteMany: function (req, res) {
    db.Dj.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.deleteMany())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
