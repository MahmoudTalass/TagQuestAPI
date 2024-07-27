const asyncHandler = require("express-async-handler");
const GameService = require("./game.service");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/app_errors");
const { validationResult, body } = require("express-validator");
const { isValidObjectId } = require("mongoose");

const startGame = asyncHandler(async (req, res, next) => {
   const token = await GameService.createGameJWT();

   res.json({ token });
});

const checkAttempt = [
   body("characterId", "Character not found").custom((val) => isValidObjectId(val)),
   body("token").isJWT(),
   body(
      "xLocationRange",
      "Must provide an array with the starting x range and the ending x range"
   ).isArray({ max: 2, min: 2 }),
   body(
      "yLocationRange",
      "Must provide an array with the starting y range and the ending y range"
   ).isArray({ max: 2, min: 2 }),
   asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const errorString = errors.array().join("\n");
         throw new AppError(errorString, 400);
      }

      const { characterId, token, xLocationRange, yLocationRange } = req.body;

      const jsonToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) throw new AppError("Invalid token", 400);

         return decoded;
      });

      const isCorrectAttempt = await GameService.checkAttempt(
         characterId,
         xLocationRange,
         yLocationRange
      );

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
         tokenPayload.startTime = jsonToken.startTime;
         responseToken = responseToken = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      } else {
         responseToken = token;
      }

      res.json({
         hasWon,
         hitTarget: isCorrectAttempt,
         token: responseToken,
      });
   }),
];

module.exports = {
   startGame,
   checkAttempt,
};
