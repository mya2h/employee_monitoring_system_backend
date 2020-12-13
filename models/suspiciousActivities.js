const mongoose = require('mongoose')

const suspiciousActivitiesSchema = mongoose.Schema({
    deviceId:{
        type:String
    },
    file:{
        type:String
    },

})
module.exports = mongoose.model('Suspicious',suspiciousActivitiesSchema)