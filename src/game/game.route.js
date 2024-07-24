const express = require("express");
const router = express.Router();
const gameController = require("./game.controller");

// route to start game by sending user a jwt with starting time and array of characters to be found
router.post("/start", gameController.startGame);

router.post("/check-attempt", gameController.checkAttempt);

module.exports = router;
