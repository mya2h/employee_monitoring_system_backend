const mongoose = require("mongoose");

const HRpersonnelSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
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
    pattern : "@mongodb\.com$",
    require: true, 
  },
  roleType: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirm_password: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("HRpersonnel", HRpersonnelSchema);
