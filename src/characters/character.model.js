const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
   name: { type: String, required: true },
   xLocationRange: {
      type: [{ type: Array, required: true }],
      validate: [arrayLength, "{PATH} must contain the starting x and the ending x ranges."],
   },
   yLocationRange: {
      type: [{ type: Array, required: true }],
      validate: [arrayLength, "{PATH} must contain the starting y and the ending y ranges."],
   },
});

function arrayLength(array) {
   return array.length === 2;
}

module.exports = mongoose.model("Character", CharacterSchema);
