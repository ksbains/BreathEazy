const mongoose = require('mongoose');

const forecastSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pm2_5Data: {
        type: String,
        required: true
    },
    pm10Data: {
        type: String,
        required: true
    },tempData: {
        type: String,
        required: false
    },
    humidityData: {
        type: String,
        required: false
    },
    dateTimeData:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('sensor', sensorSchema);