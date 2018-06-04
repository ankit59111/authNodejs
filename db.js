const mongoose = require('mongoose');
const user = require('./model/user');
module.exports = ()=>{
    mongoose.connect('mongodb://test1:test01@ds247690.mlab.com:47690/auth');
}
