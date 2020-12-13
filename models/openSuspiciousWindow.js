const mongoose = require("mongoose");

const openSuspiciousWindow = new mongoose.Schema({
  deviceUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deviceUser",
  },
  app: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  host: {
    type: String,
  },
  duration: {
    type: Number,
    default: 0,
  },
  date: {
    type: Number,
    default: new Date().getDate(),
  },
});

module.exports = User = mongoose.model("openSuspiciousWindow", openSuspiciousWindow);
