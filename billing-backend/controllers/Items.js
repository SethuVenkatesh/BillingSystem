const express=require('express')
var router = express.Router();
const user = require('../schemas/user');
const firm = require('../schemas/firm');
const item = require("../schemas/item");

router.post("/all-party-items",async (request,response)=>{
    try{
        console.log(request.body)
        const firmId  = request.body.firmId;
        
        const allItems =await item.find({firm:firmId,is_deleted:false}).populate('party').exec()
        response.status(200).send(allItems)

    }
    catch(e){
        response.status(500).send("Error in fetching items")
    }
})

router.post('/new',async (request,response)=>{
    const itemDetails = request.body.itemData;
     try{
        const itemData = await item.create(itemDetails);
        response.status(200).send("Item created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("Item creation failed")
    }
})

router.put("/update/:id",async (request,response)=>{
    try{
        let ItemId=request.params.id
        const itemDetails = request.body.itemData;
        console.log(itemDetails)
        const updatedItem=await item.findByIdAndUpdate(
            ItemId,
            itemDetails,
            {new: true},
        );
        response.status(200).send(updatedItem)
    }catch(e){
        console.log(e);
        response.status(400).send("error in updating item")
    }
})

router.delete("/delete/:id",async (request,response)=>{
    try{
        let itemId=request.params.id
        const updatedItem=await item.findByIdAndUpdate(
            itemId,
            {is_deleted:true},
            {new: true},
        );
        response.status(200).send(updatedItem)
    }catch(e){
        console.log(e);
        response.status(400).send("error in deleting item")
    }
})

module.exports = router;