const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const dotenv = require("dotenv")

//initialzing app
const app=express()
dotenv.config()


//mongodb connection
mongoose.connect(process.env.mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("mongodb connected"))
.catch((err)=>{console.log("err:",err)});

const Company = require("./contollers/Company")
const User = require("./contollers/User")

//applying middleware cors and bodyparser json
app.use(express.json());
app.use(cors())

//routes 
app.use('/company',Company)
app.use('/user',User)

//listening to port
app.listen(process.env.port,(req,res)=>{
    console.log(`Listening on port ${process.env.port}`)
})

