const router = require("express").Router();
const djController = require("../../controllers/djController.js");
const passport = require("../../config/passport")

// Matches with "/api/djs"
router.route("/")
  .post(djController.create)

router.route("/login")  
  .post(djController.login);

router.route("/event")  
  .post(djController.create);


  
// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
