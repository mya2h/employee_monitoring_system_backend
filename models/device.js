const mongoose = require('mongoose');
const DeviceSchema = mongoose.Schema({
   device_id:{
       type: String,    
   },
   device_name:{
        type: String,
   }
})
module.exports = mongoose.model("device", DeviceSchema)