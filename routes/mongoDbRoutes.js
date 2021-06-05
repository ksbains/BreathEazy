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
router.get('/allUsers', async (req, res) => {
    try {
        const user = await Sensor.find();
        res.json(user);
    } catch (err) {
        res.status(200);
        res.json({message: err});
    }
});

router.get('/sensor', async (req,res) => {
    console.log("HEY")
    res.send("HI");
});



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
        res.status(201);
        res.json(req);
    }       
});


//***********************************AQI *************************************** */
router.post('/sensor', async (req,res) => {
    var sensorInfo = req.body;
    const sensor = new Sensor({
        username: sensorInfo.username,
        pm2_5Data: sensorInfo.pm2_5Data,
        pm10Data: sensorInfo.pm10Data,
        tempData: sensorInfo.tempData,
        humidityData: sensorInfo.humidityData,
        dateTimeData: sensorInfo.dateTimeData
    })
    
    try {
        const savedSensor = await sensor.save();
        res.json(savedSensor);
    } catch (err){
        res.status(200);
        res.json({message: err});
    }       
});

router.post('/sensorz', async (req,res) => {
    const data = []
    Sensor.find({ "username": req.body.username }).sort({_id:-1}).exec((error, sensor) => {
        if (error) {
        console.log(error);
        res.status(202).end('Error Occured');
        }
           if (sensor) {
      sensor.forEach((element) => {
        data.push(element);
      });
    }
    // console.log(data);

        res.send(data);
        // console.log(data);
    });
});

module.exports = router;