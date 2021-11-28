const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

try {
  const { parsed: config } = dotenv.config({
    path: path.join(__dirname, "config/config.env"),
  });

  if (!config) {
    throw new Error("Can't read environments file");
  }

  mongoose.connect(config.MONGO_URI, (error) => {
    if (error) throw error;
  });

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const { AppRouter } = require("./routes/router");
  app.use("/api", AppRouter);

  // Handle errors.
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
  });

  app.listen(config.PORT, () =>
    console.log(`Server running on port ${config.PORT}`)
  );
} catch (e) {
  console.error(e);
}
