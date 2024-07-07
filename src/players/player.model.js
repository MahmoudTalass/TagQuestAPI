const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
   name: { type: String, required: true },
   score: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model("Player", PlayerSchema);
