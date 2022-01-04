//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const userRoute = require('./routers/user');
const secretRouter = require('./routers/secret')
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cookieParser())

mongoose.connect(process.env.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("useCreateIndex", true);
app.use(userRoute);
app.use(secretRouter)
const PORT = process.env.PORT


app.get('/',(req,res)=>{res.render('home')})

app.listen(PORT, function(){
    console.log(`server running at port ${PORT}`);
})