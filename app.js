const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());

require("./src/db.config");
app.use(cors());

const indexRouter = require("./src/index.route");

app.use("/api", indexRouter);

const errorHandler = require("./src/errors/error_handler");

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});
