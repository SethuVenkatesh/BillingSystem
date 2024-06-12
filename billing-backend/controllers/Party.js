const express= require('express')
var router = express.Router();
const party = require('../schemas/party')
const item = require("../schemas/item")

router.post('/new',async (request,response)=>{
    const partyDetails = request.body.partyDetails;
     try{
        const partyData = await party.create(partyDetails);
        response.status(200).send("party created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("party creation failed")
    }
})

router.get("/all/:id",async (request,response)=>{
    let firmId=request.params.id
    try{
        const allParties=await party.find({is_deleted : false,firm:firmId});
        response.status(200).send(allParties)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving parties")
    }
})

router.get("/all",async (request,response)=>{
    const partyName = request.query.partyName;
    try{
    const allParties=await party.find({is_deleted : false,party_name:{$regex : partyName,$options : "i"}});
        response.status(200).send(allParties)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving parties")
    }
})

router.get("/all_items",async (request,response)=>{
    const {firmId,partyId} = request.query;
    try{
        const allItems = await item.find({is_deleted:false,firm:firmId,party:partyId});
        response.status(200).send(allItems);
    }catch(e){
        console.log(e);
        response.status(400).send("Error in retriving items")
    }
})
router.get("/details/:id",async (request,response)=>{
    try{
        let partyId=request.params.id
        const partyDetail=await party.findOne({_id:partyId});
        response.status(200).send(partyDetail)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving party")
    }
})

router.put("/update/:id",async (request,response)=>{
    try{
        let partyId=request.params.id
        const partyDetails = request.body.partyDetails;
        console.log(partyDetails)
        const updatedParty=await party.findByIdAndUpdate(
            partyId,
            partyDetails,
            {new: true},
        );
        response.status(200).send(updatedParty)
    }catch(e){
        console.log(e);
        response.status(400).send("error in updating party")
    }
})

router.delete("/delete/:id",async (request,response)=>{
    try{
        let partyId=request.params.id
        const updatedParty=await party.findByIdAndUpdate(
            partyId,
            {is_deleted:true},
            {new: true},
        );
        response.status(200).send(updatedParty)
    }catch(e){
        console.log(e);
        response.status(400).send("error in deleting party")
    }
})



module.exports = router;