const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
    secret : {
        type: String,
        required: true,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    }
})
const Secret = mongoose.model('Secret',secretSchema)
module.exports = Secret