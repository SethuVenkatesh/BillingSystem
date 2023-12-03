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
const Employee = require("./contollers/Employee")

const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000']; // Add other origins as needed
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the request origin is in the allowed list or if it's undefined (e.g., from a browser)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
};
//applying middleware cors and bodyparser json
app.use(express.json());
app.use(cors(corsOptions))

//routes 
app.use('/company',Company)
app.use('/user',User)
app.use("/employee",Employee)

//listening to port
app.listen(process.env.port,(req,res)=>{
    console.log(`Listening on port ${process.env.port}`)
})

