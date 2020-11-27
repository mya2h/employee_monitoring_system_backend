const mongoose = require("mongoose");

const activeWindow = new mongoose.Schema({
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
  duration: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("activeWindow", activeWindow);
