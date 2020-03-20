const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_id: {
        type:String,
        require: true
    },
    username:{
        type:String,
        require: true
    },
    created_at: {
        type:Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model('User',UserSchema);