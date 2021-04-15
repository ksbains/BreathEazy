const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const port = process.env.PORT || 3000;

//DB Connect
const mongoDBName = 'mongodb+srv://yash123:yash123@tmcluster.wzjib.mongodb.net/IAQ-Data';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
}
mongoose.connect(mongoDBName, options, (err, res) => {
    if(err){
        console.log(err);
        console.log("MongoDb connection FAILED!!")
    } else {
        console.log("MongoDB Connected!!!")
    }
});

//Import  routes
const raspberyyPiRoutes = require('./routes/raspberryPiRotues');


//Routes

app.get('/', (req, res) => {
    res.send("This is the main page for BreatheEazy!")
    console.log("Sever route, '/' has been hit!")
});

app.use('/pi', raspberyyPiRoutes);

app.listen(port, () => console.log('Listening on port 3000'));