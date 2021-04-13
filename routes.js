'use strict';
module.exports = function( app ) {

//HERE ARE ALL THE ROUTES
//COMMON ROUTES HERE
    app.get('/', (req, res) => {
        res.send("This is the main page for BreatheEazy!")
        console.log("Sever route, '/' has been hit!")
    });


//DB ROUTES HERE


//RASPBERRY ROUTES HERE



//FRONT END ROUTES HERE


};