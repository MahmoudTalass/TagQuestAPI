const asyncHandler = require("express-async-handler");
const GameService = require("./game.service");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/app_errors");

const startGame = asyncHandler(async (req, res, next) => {
   const token = await GameService.createGameJWT();

   res.json({ token });
});

const checkAttempt = asyncHandler(async (req, res, next) => {
   const { characterId, token, xLocationRange, yLocationRange } = req.body;

   const jsonToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new AppError("Invalid token", 400);

      return decoded;
   });

   const isCorrectAttempt = GameService.checkAttempt(characterId, xLocationRange, yLocationRange);

   let responseToken;
   const tokenPayload = {};
   let hasWon = false;

   if (isCorrectAttempt) {
      const characterIds = jsonToken.characterIds.filter((charId) => charId != characterId);
      tokenPayload.characterIds = characterIds;
      if (characterIds.length === 0) {
         hasWon = true;
         tokenPayload.finishTime = Date.now();
      }

      responseToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);
   } else {
      responseToken = token;
   }

   res.json({
      hasWon,
      token: responseToken,
   });
});

module.exports = {
   startGame,
   checkAttempt,
};
