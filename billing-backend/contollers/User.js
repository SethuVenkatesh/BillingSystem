const express=require('express')
var router = express.Router();
const user = require('../schemas/user');
const { sendMail } = require('../helper/SendMail');
const authToken = require('../schemas/authToken');

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

router.post('/reset_password', async (request,response) => {
    try{
        const email = request.body.email;
        const userData = await user.findOne({email:email});
        if(!userData){
            response.status(200).json({status:false, msg:"email address is not registered yet."})
        }

        const otp = Math.floor(900000 * Math.random() + 100000);
        const auth = await authToken.create({user_id:userData._id, verification_code:otp});
        if(auth && auth.verification_code){
            const subject = 'OTP verification';
            const content = `<p>You have requested to reset your password. Please use the following One-Time Password (OTP) to complete the process:</p>
                            <h2>Your OTP: <b>`+otp+`</b></h2>
                            <p>If you did not request a password reset, please ignore this email.</p>
                            <p>Use the provided OTP to reset your password. The OTP is valid for a short period of time.</p>
                            <p>Best regards,<br>Your App Team</p>`;    
            const res = await sendMail(email, subject, content);
            if(res.status){
                response.status(200).json({ status:false, msg:"mail sent successfully"});
            }else{
                response.status(200).json({ status:false, msg:'Sending mail failed..'});
            }    
        }else{
            response.status(200).send('Error in generating OTP.');
        }
    }catch(e){
        console.log(e);
        response.status(400).json({err:e, msg:"error"});
    }
})

module.exports = router;
