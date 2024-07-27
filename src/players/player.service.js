const Player = require("./player.model");

class PlayerService {
   async getPlayers(page, pageSize) {
      // If "pageNumber" and "playersPerPage" are not sent we will default them to 1 and 50.
      page = parseInt(page, 10) || 1;
      pageSize = parseInt(pageSize, 10) || 50;

      const players = await Player.find({})
         .sort({ score: 1 })
         .skip((page - 1) * pageSize)
         .limit(pageSize)
         .exec();
      const totalPages = Math.ceil((await Player.countDocuments().exec()) / pageSize);

      const result = {
         metadata: { totalPages, page, pageSize },
         players,
      };

      return result;
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

module.exports = new PlayerService();
