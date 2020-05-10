const express = require("express");
const app = express();
require('colors');
require("dotenv").config();
const PORT = process.env.PORT || 5000 ;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,()=>{
    console.log("Connected to database".yellow.italic);
})
//MainRouter
const router = require('./Routes');

app.use(router);

app.listen(PORT, () => {
    console.log(`Server Started At Port ${PORT}`.green.bold);
})