const mongoose = require("mongoose");
const config = require("./config");

const debug = require("debug")("mongoose");

mongoose
  .connect(config.dbConnstring)
  .then(() => {
    debug(`connected`);
  })
  .catch(() => {
    debug(`error`);
  });
