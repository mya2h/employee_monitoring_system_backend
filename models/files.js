const mongoose = require('mongoose');
const FileSchema = mongoose.Schema({
   device:{
         type: String,
   },
   path:{
        type: String,
        required: 'URL can\'t be empty',
   }
})
module.exports = File = mongoose.model("file", FileSchema)