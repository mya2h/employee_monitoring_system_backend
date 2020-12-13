
const mongoose = require("mongoose");

const SocketSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Need User name']
      }
});

module.exports = mongoose.model("SocketI", SocketSchema);
