const mongoose = require("mongoose");

const changedFileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deviceUser",
  },
  name: {
    type: String,
    require: true,
  },
  changedMode: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("changedFile", changedFileSchema);
