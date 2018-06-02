const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    address:String,
    password:String
})

module.exports = mongoose.model('user',userSchema);