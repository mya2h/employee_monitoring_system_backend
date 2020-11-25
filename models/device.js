const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema({
  deviceName: {
    type: String,
    require: true,
  },
  deviceUser: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Device", DeviceSchema);
