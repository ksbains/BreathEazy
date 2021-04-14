const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const port = 3000;
const routes = require('./routes');

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

routes(app);

app.listen(port, () => console.log('Listening on port 3000'));