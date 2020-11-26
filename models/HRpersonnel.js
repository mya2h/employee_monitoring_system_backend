const mongoose = require("mongoose");

const HRpersonnelSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("HRpersonnel", HRpersonnelSchema);
