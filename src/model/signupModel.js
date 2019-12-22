const mongoose = require('mongoose');
var signupSchema = new mongoose.Schema({
    consumerNo: { type: String, required: true },
    email: {
        type: String, required: true
    },
    password:String,
    confirmPassword:String
     
});
var signupModel=mongoose.model('logins',signupSchema);
module.exports={signupModel};