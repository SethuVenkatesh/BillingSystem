const company = require('../schemas/company')
const express=require('express')
var router = express.Router();

router.post("/new", async (request, response) => {
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

router.get("/all",async (request,response)=>{
    try{
        const allCompany=await company.find({isDeleted:false});
        response.status(200).send(allCompany)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving company")
    }
})


router.get("/:id",async (request,response)=>{
    try{
        let companyId=request.params.id
        const companyDetail=await company.findOne({_id:companyId});
        response.status(200).send(companyDetail)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving company")
    }
})

router.put("/:id",async (request,response)=>{
    try{
        let companyId=request.params.id
        let companyDetail = request.body.companyData;
        const updatedcompany=await company.findByIdAndUpdate(
            companyId,
            companyDetail,
            {new: true},
        );
        response.status(200).send(updatedcompany)
    }catch(e){
        console.log(e);
        response.status(400).send("error in updating company")
    }
})

router.delete("/:id",async (request,response)=>{
    try{
        let companyId=request.params.id
        const updatedcompany=await company.findByIdAndUpdate(
            companyId,
            {isDeleted:true},
            {new: true},
        );
        response.status(200).send(updatedcompany)
    }catch(e){
        console.log(e);
        response.status(400).send("error in deleting company")
    }
})

module.exports = router;