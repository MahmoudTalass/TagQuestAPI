const Character = require("./character.model");

class CharacterService {
   async getCharacters() {
      const characters = await Character.find({}).exec();
      return characters;
   }

   async getCharacter(id) {
      const character = await Character.findById(id).exec();
      return character;
   }
}

module.exports = CharacterService;
