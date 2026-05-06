const { configDotenv } = require('dotenv');
const express = require('express');
const { get, connection } = require('mongoose');
const app = express();
require ('dotenv').config();
const PORT= process.env.PORT 
require('./connection.js')


app.listen(PORT,()=>{
    console.log(`server is listen on port ${PORT}`)
})