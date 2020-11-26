const mongoose = require('mongoose')

const suspiciousActivitiesSchema = mongoose.Schema({
    device_id:{
        type:String
    },
    activtiy_name:{
        type:String
    },
    activity_type:{
        type:String
    },

})
module.exports = Suspicious = mongoose.model('suspicious',suspiciousActivitiesSchema)