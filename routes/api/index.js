const router = require("express").Router();
const djRoutes = require("./djs");

// Dj routes
router.use("/djs", djRoutes);

module.exports = router;
