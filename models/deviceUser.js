const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model("deviceUser", userSchema);
