const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./api/routes/user');

mongoose.connect('mongodb+srv://anuja:anuja@anujacluster.pwxlokh.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection fail');
});

mongoose.connection.on('connected',connected=>{
    console.log("connected with database.....");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/product',productRoute);
app.use('/user',userRoute);

app.use((req,res,next)=>{
    res.status(404).json({
        error:"url is not found"
    })
})

module.exports = app;