const express = require("express");
const router = express.Router();

// @route GET api/post
// @desc Test route
// @access Public
router.get("/", (req, res) => {
  res.send("Posts Route");
});

module.exports = router;
