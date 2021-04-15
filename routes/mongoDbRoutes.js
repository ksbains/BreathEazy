'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Sensor = require('../models/sensor');

//**************************************************** */ GET ROUTES ************************************************

//***************************Users********************************* */
router.get('/allUsers', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(200);
        res.json({message: err});
    }
});

router.get('/:username', async (req,res) => {
    var username = req.params.username;
    try {
        const user = await User.findOne({username: username});
        res.json(user);
    } catch (err) {
        res.status(200);
        res.json({message: err});
    }
})

//***********************************AQI******************************** */



//***************************************************************************POST ******************* ************************************/

//******************************USERS ************************************ */
router.post('/user', async (req,res) => {
    var userInfo = req.body;
    const user = new User({
        username: userInfo.username,
        password: userInfo.password,
        location: userInfo.location,
        userType: userInfo.userType,
        homeType: userInfo.homeType,
        isSmoker: userInfo.isSmoker,
        hasAc: userInfo.hasAc,
        houseAge: userInfo.houseAge
    })
    
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err){
        res.status(200);
        res.json({message: err});
    }       
});


//***********************************AQI *************************************** */
router.post('/sensor', async (req,res) => {
    var sensorInfo = req.body;
    const sensor = new Sensor({
        pm2_5Data: sensorInfo.pm2_5Data,
        pm10Data: sensorInfo.pm10Data,
        tempData: sensorInfo.tempData,
        humidityData: sensorInfo.humidityData
    })
    
    try {
        const savedSensor = await sensor.save();
        res.json(savedSensor);
    } catch (err){
        res.status(200);
        res.json({message: err});
    }       
});

module.exports = router;