const mongoose = require("mongoose");

const TrackSchema = mongoose.Schema({
  activity_id: {
    type: String,
    require: true,
  },
  activity_name: {
    type: String,
    require: true,
  },
  activity_type: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Track = (module.exports = mongoose.model("User", TrackSchema));
