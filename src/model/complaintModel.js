const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var complaintSchema = new Schema({
   
    name : String,
    complaints: String,
    date : String,
    phoneNumber : Number,
    address : String
   
});

var complaintModel = mongoose.model('complaints', complaintSchema);                  
module.exports = {complaintModel};