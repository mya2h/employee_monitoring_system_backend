const mongoose = require("mongoose");

const NotTrackSchema = mongoose.Schema({
  deviceUser_Id: {
    type: String,
    require: true,
  },
  resource_Id: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("NotTrack", NotTrackSchema);
