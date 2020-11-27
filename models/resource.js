const mongoose = require("mongoose");

const ResourceSchema = mongoose.Schema({
  resourceName: {
    type: String,
    require: true,
  },
  resourceType: {
    type: String,
    require: true,
  },
  resourcePath: {
    type: String
    
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Resource", ResourceSchema);
