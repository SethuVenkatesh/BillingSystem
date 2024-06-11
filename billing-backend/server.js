const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const dotenv = require("dotenv")
const resetCounter = require("./schemas/ResetCounter")
//initialzing app
const app=express()
dotenv.config()


//mongodb connection
mongoose.connect(process.env.mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true})
.then(async ()=>{
    // await resetCounter()
    console.log("mongodb connected")
})
.catch((err)=>{console.log("err:",err)});

// Controllers
const User = require("./controllers/User")
const Employee = require("./controllers/Employee")
const Firm = require("./controllers/Firm")
const Party = require("./controllers/Party")
const Item = require("./controllers/Items")
const Sales = require("./controllers/Sales")
//applying middleware cors and bodyparser json
app.use(express.json());
app.use(cors())

//routes 
app.use("/user",User)
app.use("/employee",Employee)
app.use("/firm",Firm)
app.use("/party",Party)
app.use("/item",Item)
app.use("/sales",Sales)
//listening to port
app.listen(process.env.port,(req,res)=>{
    console.log(`Listening on port ${process.env.port}`)
})

