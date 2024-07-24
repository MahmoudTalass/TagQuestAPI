const express = require("express");
const router = express.Router();

const charactersRouter = require("./characters/character.route");
const playersRouter = require("./players/player.route");
const gameRouter = require("./game/game.route");

router.use("/characters", charactersRouter);
router.use("/players", playersRouter);
router.use("/game", gameRouter);

module.exports = router;
