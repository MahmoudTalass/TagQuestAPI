const express = require("express");
const app = express();

const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
   windowMs: 1 * 60 * 1000,
   max: 30,
});

require("dotenv").config();
app.use(express.json());

const connectDB = require("./src/db.config");
connectDB().catch((err) =>
   app.status(500).json({ status: 500, message: "Something went wrong. Please try again later" })
);

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(limiter);

const indexRouter = require("./src/index.route");

app.use("/api", indexRouter);

const errorHandler = require("./src/errors/error_handler");

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});
