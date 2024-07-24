const express = require("express");
const router = express.Router();
const playerController = require("./player.controller");

// gets all players in sorted order from best score to worse.
// this route expects client to provide a page number and how
// many documents/items go on each page.
router.get("/", playerController.getPlayers);

// creates a new player
router.post("/", playerController.createPlayer);

module.exports = router;
