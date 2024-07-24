const asyncHandler = require("express-async-handler");
const CharactersService = require("./character.service");

const getAllCharacters = asyncHandler(async (req, res, next) => {
   const characters = await CharactersService.getCharacters();

   res.json(characters);
});

module.exports = { getAllCharacters };
