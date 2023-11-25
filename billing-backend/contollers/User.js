const express=require('express')
var router = express.Router();
const user = require('../schemas/user')

router.post('/new',async (request,response)=>{
    const userDetails = request.body.userData;
     try{
        const userData = await user.create(userDetails);
        response.status(200).send("user created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("user creation failed")
    }

})

module.exports = router;
