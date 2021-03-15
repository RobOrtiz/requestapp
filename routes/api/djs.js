const router = require("express").Router();
const djController = require("../../controllers/djController.js");

// Matches with "/api/djs"
router.route("/")
  .post(djController.createDj)
  .get(djController.findAll)
  .get(djController.findByIdDj);

router.route("/all")
  .get(djController.findAll)
  
// Matches with "/api/djs/:id"
// router.route("/:id")
//   .get(djController.findByIdDj)

router.route("/event/:id")
  .get(djController.findEventById)
  .put(djController.findSongById);

router.route("/event")
  // .get(djController.findEvent)  
  .post(djController.createEvent)
  .put(djController.createRequest)

module.exports = router;
