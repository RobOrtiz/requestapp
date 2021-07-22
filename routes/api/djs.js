const router = require("express").Router();
const djController = require("../../controllers/djController.js");

// Matches with "/api/djs"
router.route("/")
  .post(djController.createDj)
  .get(djController.findAll)
  .put(djController.updateDj)
  // We are not using this route - we use the findAll one to find all events for the Dj
  // .get(djController.findByIdDj);

router.route("/all")
  .get(djController.findAll)

// Matches with "/api/djs/:id"
// router.route("/:id")
//   .get(djController.findByIdDj)

router.route("/event/:id")
  .get(djController.findEventById)

router.route("/event")
  // .get(djController.findEvent)  
  .post(djController.createEvent)
  .put(djController.createRequest)

router.route("/updateEvent")
  .put(djController.updateEvent)

router.route("/eventstatus")
  .put(djController.updateEventStatus)

router.route("/requests")
  .put(djController.findSongById)

router.route("/requests/:id")
  .get(djController.countSongStatuses)
  .put(djController.updateQueueNumber)

router.route("/charge")
  .post(djController.createCharge)
  .put(djController.updateCharge)

module.exports = router;
