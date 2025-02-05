const jwt = require("jsonwebtoken");
const CharactersService = require("../characters/character.service");

class GameService {
   async createGameJWT() {
      const characters = await CharactersService.getCharacters();
      const token = jwt.sign(
         {
            characterIds: characters.map((character) => {
               return character.id;
            }),
            startTime: Date.now(),
         },
         process.env.JWT_SECRET
      );

      return token;
   }

   async checkAttempt(characterId, xLocationRange, yLocationRange) {
      const character = await CharactersService.getCharacter(characterId);

      const isXInRange =
         character.xLocationRange[0] <= xLocationRange[1] &&
         character.xLocationRange[1] >= xLocationRange[0];

      const isYInRange =
         character.yLocationRange[0] <= yLocationRange[1] &&
         character.yLocationRange[1] >= yLocationRange[0];

      return isXInRange && isYInRange;
   }
}

module.exports = new GameService();
