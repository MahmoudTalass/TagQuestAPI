const Character = require("./character.model");

class CharacterService {
   async getCharacters() {
      const characters = await Character.find({}, { xLocationRange: 0, yLocationRange: 0 }).exec();
      return characters;
   }

   async getCharacter(id) {
      const character = await Character.findById(id).exec();
      return character;
   }
}

module.exports = new CharacterService();
