const mongoose = require('mongoose');

const predictionSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    pm10prediction: {
        type: Number,
        required: true
    },
    pm25prediction: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('prediction', predictionSchema);