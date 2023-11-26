const express=require('express')
var router = express.Router();
const user = require('../schemas/user')

router.post('/new',async (request,response)=>{
    const userDetails = request.body.userDetails;
     try{
        const userData = await user.create(userDetails);
        response.status(200).send("user created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("user creation failed")
    }
})

router.post('/login',async (request,response)=>{
    try{
        const userDetails = request.body.userCredentials;
        const userData=await user.findOne({username:userDetails.username});
        response.status(200).send(userData)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving company")
    }
    
})

router.post('/isExist',async (request,response)=>{
    try{
        let email = request.body.mailId;
        let emailFound = false;
        let userData =await user.findOne({email:email});
        if(userData){
            emailFound = true;
        }
        response.status(200).send({emailFound:emailFound});
    }catch(e){

    }
})

router.post('/details',async (request,response)=>{
    try{
        let email = request.body.mailId;
        let userData =await user.findOne({email:email}).select('-password');
        response.status(200).send(userData);
    }catch(e){

    }
})

module.exports = router;
