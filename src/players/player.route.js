const express = require("express");
const router = express.Router();

// gets all players in sorted order from best score to worse.
// this route expects client to provide a page number and how
// many documents/items go on each page.
router.get("/");

// creates a new player
router.post("/");

// get a certain player
router.get("/:id");

module.exports = router;
