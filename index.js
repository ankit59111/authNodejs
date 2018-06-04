const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('./db')();
const loginUser = require('./controller/login.controller');
const registerUser = require('./controller/register.controller');
const resetPassword = require('./controller/resetpasswordmail.controller');
const updatePassword = require('./controller/updatePassword.controller');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login',loginUser);

app.post('/register',registerUser);
app.post('/resetPassword',resetPassword);
app.post('/updatePassword',updatePassword);
const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log('its running at localhost : ',PORT);
})