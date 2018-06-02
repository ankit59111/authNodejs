const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('./db')();
const loginUser = require('./controller/login.controller');
const registerUser = require('./controller/login.controller');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login',loginUser);

app.post('/register',registerUser);

const PORT = process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log('its running at localhost : ',PORT);
})