const Player = require("./player.model");

class PlayerService {
   async getPlayers(pageNumber, playersPerPage) {
      const players = await Player.find({})
         .sort({ score: 1, id: 1 })
         .skip(pageNumber * playersPerPage)
         .limit(playersPerPage)
         .exec();
      return players;
   }

   async getPlayer(id) {
      const player = await Player.findById(id).exec();
      return player;
   }

   async createPlayer(name, score) {
      const player = new Player({
         name,
         score,
      });

      return await player.save();
   }
}

module.exports = PlayerService;
