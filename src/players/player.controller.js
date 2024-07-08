const asyncHandler = require("express-async-handler");
const PlayerService = require("./player.service");

const getPlayers = asyncHandler(async (req, res, next) => {
   const { page, pageSize } = req.query;
   const players = await PlayerService.getPlayers(page, pageSize);

   res.json(players);
});

const getPlayer = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const player = await PlayerService.getPlayer(id);
   res.json(player);
});

const createPlayer = asyncHandler(async (req, res, next) => {
   const { name, score } = req.body;
   const player = await PlayerService.createPlayer(name, score);
   res.json(player);
});

module.exports = {
   getPlayers,
   getPlayer,
   createPlayer,
};
