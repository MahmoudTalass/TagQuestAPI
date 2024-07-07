const express = require("express");
const router = express.Router();

// get all characters
router.get("/");

// get certain character
router.get("/:id");

module.exports = router;
