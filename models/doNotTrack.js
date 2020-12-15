const mongoose = require('mongoose')

const doNotTrack = mongoose.Schema({
    deviceId:{
        type:String
    },
    file:{
        type:String
    },

})
module.exports = mongoose.model('DoNotTrack',doNotTrack)