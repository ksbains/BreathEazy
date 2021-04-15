const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
     location: {
         type: String, 
         //required: true
     }, 
     userType: {
         type: String,
         //required: true
     },
     //THIS IS THE FORM DETAILS
     homeType: {
         type: String,
         required: false
     }, 
     isSmoker: {
         type: Boolean, 
         required: false
     },
     hasAC:  {
        type: Boolean, 
        required: false
    },
    houseAge: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('user', userSchema);