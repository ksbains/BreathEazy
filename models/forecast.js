const mongoose = require('mongoose');

const forecastSchema = mongoose.Schema({
    pm2_5Data: [{
        pm2_5: {
            type: String,
            required: true
        },
        dateTime: {
            type: String,
            required: true,
            timestamp: true
        },
        
    }],
    pm10Data:[{
        pm_10: {
            type: String,
            required: true
        },
        dateTime: {
            type: String,
            required: true,
            timestamp: true
        },
        
    }],
    tempData: [{
        temp: {
            type: String,
            required: true
        },
        dateTime: {
            type: String,
            required: true,
            timestamp: true
        },
        
    }],
    humidityData: [{
        humidity: {
            type: String,
            required: true
        },
        dateTime: {
            type: String,
            required: true,
            timestamp: true
        },
        
    }]
})

module.exports = mongoose.model('sensor', sensorSchema);