const express = require("express");
const router = express.Router();
const charactersController = require("./character.controller");
// get all characters
router.get("/", charactersController.getAllCharacters);

module.exports = router;
