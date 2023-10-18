const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')

const company=require('./schemas/company')

const app = express();
const dotenv = require("dotenv")
dotenv.config()



mongoose.connect(process.env.mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>console.log("mongodb connected"))
.catch((err)=>{console.log("err:",err)});

app.use(express.json());

app.listen(process.env.port,(req,res)=>{
    console.log(`Listening on port ${process.env.port}`)
})

app.post("/company", async (request, response) => {
    try{
        const companyDetails = request.body;
        const companyData = await company.create(companyDetails);

        response.status(200).send("created successfully")
    }catch(e){
        response.status(400).send("created unsuccessfully")
    }
  });