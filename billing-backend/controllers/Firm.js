const express=require('express')
var router = express.Router();
const firm = require('../schemas/firm');

router.get("/:id",async (request,response)=>{
    try{
        let firmId=request.params.id
        const firmDetail=await firm.findOne({_id:firmId});
        response.status(200).send(firmDetail)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving firm")
        
    }
})

router.put("/:id",async (request,response)=>{
    try{
        let firmId=request.params.id
        let firmDetail = request.body.firmData;
        const updatedFirm=await firm.findByIdAndUpdate(
            firmId,
            firmDetail,
            {new: true},
        );
        response.status(200).send(updatedFirm)
    }catch(e){
        console.log(e);
        response.status(400).send("error in updating firm")
    }
})

module.exports = router;