const mongoose = require("mongoose");
const deviceUserSchema = new mongoose.Schema({
  macAddress: {
    type: String,
    required: true,
  },
  deviceName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    require: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("deviceUser", deviceUserSchema);
