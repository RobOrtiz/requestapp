const router = require("express").Router();
const djController = require("../../controllers/djController.js");

// Matches with "/api/books"
router.route("/")
  .post(djController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
