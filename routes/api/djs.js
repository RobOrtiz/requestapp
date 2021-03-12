const router = require("express").Router();
const djController = require("../../controllers/djController.js");

// Matches with "/api/djs"
router.route("/")
  .post(djController.createDj)
  .get(djController.findAll)
  .get(djController.findByIdDj);

// Matches with "/api/djs/:id"
// router.route("/:id")
//   .get(djController.findByIdDj)



router.route("/event")
  .get(djController.findAllEvents)  
  .post(djController.createEvent)
  .put(djController.createRequest);

module.exports = router;
