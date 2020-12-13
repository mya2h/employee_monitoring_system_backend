const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
  categoryId: {
    type: String,
    require: true,
  },
  deviceId: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Member", MemberSchema);
