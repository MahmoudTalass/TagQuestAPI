const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
   name: { type: String, required: true },
   score: { type: String, required: true },
});

module.exports = mongoose.model("Player", PlayerSchema);
