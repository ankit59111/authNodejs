const mongoose = require('mongoose');
const user = require('./model/user');
module.exports = ()=>{
    mongoose.connect('mongodb://localhost/auth');
}
