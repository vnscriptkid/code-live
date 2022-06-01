"use strict";

module.exports = {
  mailer: {
    service: "Gmail",
    auth: {
      user: "YOUR_GMAIL_ADDRESS",
      pass: "YOUR_GMAIL_PASSWORD",
    },
  },
  dbConnstring:
    "mongodb://root:123456@localhost:27017/code4share?directConnection=true&authSource=admin&retryWrites=true&w=majority",
  sessionKey: "HaloCode4Share",
};
