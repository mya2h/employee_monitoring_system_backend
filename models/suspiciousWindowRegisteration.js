const mongoose = require("mongoose");

const SuspicousWindow = new mongoose.Schema({

  app: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model("suspiciousWindow", SuspicousWindow);