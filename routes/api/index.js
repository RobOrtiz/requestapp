const router = require("express").Router();
const djRoutes = require("./djs");

// Dj routes
router.use("/dj", djRoutes);

module.exports = router;
