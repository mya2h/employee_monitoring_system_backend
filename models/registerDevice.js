const mongoose = require("mongoose");

const DeviceSchema = mongoose.Schema({
  devicename: {
    type: String,
    require: true,
  },
  deviceuser: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Device", DeviceSchema);
