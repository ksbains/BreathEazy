'use strict';
function storeData (data) {
    console.log("the data to store is: ");
    console.log(data)
    //STORE DATA TO-DO!!!!
}

function userInDB(user){
    const username = user.username
    console.log("The username is: " + username)
    //this will be replaced with DB checks
    var users = ["VOID", "alice", "bob", "charlie"]
    for(var i = 0; i < users.length; i++){
        if(username == users[i]){
            return i;
        }
    }
    return false;
}
function passwordInDB(user){
    console.log("The password is: " + user.password)
    var passwords = ["VOID","alice123", "bobISbob", "floaTruth"]
    for(var i = 0; i < passwords.length; i++){
        if(user.password == passwords[i] && i == userInDB(user)){
            return true;
        }
    }
    return false;
}
function checkPassword(user){
    if(userInDB(user)){
        if(passwordInDB(user)){
            return "Wowo the user is certified FRESH";
        } else {
            return "hey buddy! You may be a user, but your password is WRONG!";
        }
    } else {
        return "hey you! I don't take to kindly to strangers, and you aint no user of mine I did ever see!!";
    }
}
module.exports = function( app ) {

//HERE ARE ALL THE ROUTES
//COMMON ROUTES HERE
    app.get('/', (req, res) => {
        res.send("This is the main page for BreatheEazy!")
        console.log("Sever route, '/' has been hit!")
    });


//DB ROUTES HERE


//RASPBERRY ROUTES HERE
    app.post('/pmData', (req,res) => {
        //in this lambda, the request will have the pm 2.5 value, pm 10 value, time stamp, and other sensor data
        var data = {
                pm2_5: parseFloat(req.body.pm2_5),
                pm10: parseFloat(req.body.pm10),
                time: req.body.time
        }
        storeData(data)
        res.send("your data has been recieved, if you see it logged")
    });


    app.post('/userCredentials', (req,res) => {
        console.log(req.body)
        var data = {
                username: req.body.username,
                password: req.body.password
        }
        var response = checkPassword(data)
        res.send(response)
    })


//FRONT END ROUTES HERE


};