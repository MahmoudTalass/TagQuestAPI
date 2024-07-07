const express = require("express");
const app = express();
require("dotenv").config();

require("./src/db.config");

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});