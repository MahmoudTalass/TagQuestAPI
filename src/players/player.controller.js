const asyncHandler = require("express-async-handler");
const PlayerService = require("./player.service");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/app_errors");

const getPlayers = asyncHandler(async (req, res, next) => {
   const { page, pageSize } = req.query;
   const result = await PlayerService.getPlayers(page, pageSize);

   res.json(result);
});

const getPlayer = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const player = await PlayerService.getPlayer(id);
   res.json(player);
});

const createPlayer = [
   body("name", "Must provide name with at least 1 character")
      .trim()
      .notEmpty()
      .isString()
      .escape(),
   body("token", "Invalid token").isJWT(),
   asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const errorString = errors
            .array()
            .map((err) => {
               return err.msg;
            })
            .join("\n");

         console.log(errorString);
         console.log(errorString);
         throw new AppError(errorString, 400);
      }

      const { name, token } = req.body;

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) throw AppError("Invalid token", 400);

         return decoded;
      });

      const score = Math.floor(
         (new Date(decodedToken.finishTime).getTime() -
            new Date(decodedToken.startTime).getTime()) /
            1000
      );
      const player = await PlayerService.createPlayer(name, score);
      res.json(player);
   }),
];

module.exports = {
   getPlayers,
   getPlayer,
   createPlayer,
};
