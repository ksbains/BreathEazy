'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Sensor = require('../models/sensor');
const Prediction = require('../models/prediction');

//**************************************************** */ GET ROUTES ************************************************

//***************************Users********************************* */

router.get('/sensorz', async (req,res) => {
    const {
        user: username,
        limit = 5,
    } = req.query;

    const options = {
        username
    };

    const data = await Sensor.find(options).sort({ _id: -1 }).limit(parseInt(limit));
    res.json(data);
});

router.get('/user', async (req, res) => {
  // const {
  //     user: username
  // } = req.query;

  const options = {
      dataSharer: true
  };

  const profiles = await User.find(options);
  
  const PMData = await Promise.all(
      profiles.map(profile => Sensor.findOne({
          username: profile.username
      }).sort({ _id: -1 }).then(x => {
          return {
              pm10Data: x.pm10Data,
              pm2_5Data: x.pm2_5Data,
              username: x.username,
              lat: profile.lat,
              lon: profile.lon
          }
      }))
  );

  res.json(PMData);
});

router.get('/prediction', async (req,res) => {
  const {
      user: username,
      limit = 2,
  } = req.query;

  const options = {
      username
  };

  const data = await Prediction.find(options).sort({ _id: -1 }).limit(parseInt(limit));
  res.json(data);
});

router.get('/sensorz', async (req,res) => {
    const data = []
    Sensor.find({"username": req.query.user}).sort({_id:-1}).exec((error, sensor) => {
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

    router.get('/sensorzz', async (req,res) => {
        const data = []
        Sensor.find({"username": req.query.user}).sort({_id:-1}).limit(1).exec((error, sensor) => {
        if (error) {
        console.log(error);
        res.status(202).end('Error Occured');
        }
        console.log(sensor);
        
        res.send(sensor);
        // console.log(data);
        });
        });    
    
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

router.get('/:username/:password', async (req,res) => {
    var username = req.params.username;
    var password = req.params.password;
    try {
        const user = await User.findOne({username: username});

        if(user === null) {
            console.log("USER NULL")
            res.status(400);
        }

        if(username === user.username && password === user.password) {
            console.log(user);
            res.send(user);
        } else {
            res.status(400);
        }
    } catch (err) {
        res.json({message: err});
    }
})
//***********************************AQI******************************** */

router.get('/sensor', async (req,res) => {
    try {
        const sensorData = await Sensor.find();
        console.log(sensorData)
        res.json(sensorData);
    } catch (err) {
        res.status(200);
        console.log("Oh no, there has been an error!!")
        console.log(err)
        res.json({message: err});
    }
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
    Sensor.find({ "username": req.body.username }).sort({_id:-1}).limit(1).exec((error, sensor) => {
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

router.post('/signup', async (req,res) => {
    const obj = {
        username: req.body.username,
        password: req.body.password,
        location: null,
        userType: null,
        homeType: null,
        isSmoker: null,
        hasAc: null,
        houseAge: null,
        homeOwnerType: null,
        dataProvider: null,
        dataSharer: null
    };
    User.create(obj, (err, user) => {
        if(err) {
            res.json({message: err});
        }
        res.status(200);
    });
    res.status(200);
}); 

router.post('/updatehomeownertype', async (req,res) => {
   const myquery = {username: req.body.username};
   const newvalue = {
    $set: {
        homeOwnerType: req.body.homeOwnerType
    },
  };

  User.updateOne(myquery, newvalue, (error, user) => {
    if (error) {
      console.log(error);
      res.status(400);
    }
    if (user) {
        res.status(200);
    }
  });

  res.status(200);


}); 

router.post('/updateac', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
         hasAC: req.body.hasAC
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         res.status(200);
     }
   });
 
   res.status(200);
 
 
 }); 

 router.post('/updatehomytype', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
        homeType: req.body.homeType
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         res.status(200);
     }
   });
 
   res.status(200);
 
 
 }); 

 router.post('/updatesmoker', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
        isSmoker: req.body.isSmoker
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         res.status(200);
     }
   });
 
   res.status(200);
 
 
 }); 

 router.post('/updatehouseage', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
        houseAge: req.body.houseAge
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         console.log(user);
         res.status(200);
     }
   });
 
   res.status(200);
 }); 


 router.post('/updatedataprovider', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
        dataProvider: req.body.dataProvider
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         res.status(200);
     }
   });
 
   res.status(200);
 }); 

 router.post('/updatedatasharer', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
        dataSharer: req.body.dataSharer
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         console.log(req.body.dataSharer)
         res.status(200);
     }
   });
 
   res.status(200);
 }); 

 router.post('/updateall', async (req,res) => {
    const myquery = {username: req.body.username};
    const newvalue = {
     $set: {
        dataSharer: req.body.dataSharer, dataProvider: req.body.dataProvider, houseAge: req.body.houseAge, isSmoker: req.body.isSmoker, homeType: req.body.homeType, hasAC: req.body.hasAC, homeOwnerType: req.body.homeOwnerType, lat: req.body.lat, lon: req.body.long 
     },
   };
 
   User.updateOne(myquery, newvalue, (error, user) => {
     if (error) {
       console.log(error);
       res.status(400);
     }
     if (user) {
         console.log('SUCCESS!')
         res.status(200);
     }
     res.status(200);
   });
 
   res.status(200);
 }); 

module.exports = router;