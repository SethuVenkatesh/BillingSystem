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
app.use(cors())

app.listen(process.env.port,(req,res)=>{
    console.log(`Listening on port ${process.env.port}`)
})

app.post("/company/new", async (request, response) => {
    try{
        const companyDetails = request.body.companyData;
        console.log(companyDetails)
        const companyData = await company.create(companyDetails);
        response.status(200).send("created successfully")
    }catch(e){
        console.log(e)
        response.status(400).send("error in creating company")
    }
  });

app.get("/company/all",async (request,response)=>{
    try{
        const allCompany=await company.find();
        response.status(200).send(allCompany)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving company")
    }
})


app.get("/company/:id",async (request,response)=>{
    try{
        let companyId=request.params.id
        const companyDetail=await company.findOne({_id:companyId});
        response.status(200).send(companyDetail)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving company")
    }
})


app.delete("/company/:id",async (request,response)=>{
    try{
        let companyId=request.params.id
        const companyDetail=await company.deleteOne({_id:companyId});
        response.status(200).send(companyDetail)
    }catch(e){
        console.log(e);
        response.status(400).send("error in deleting company")
    }
})

