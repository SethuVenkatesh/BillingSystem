const express=require('express')
var router = express.Router();
const user = require('../schemas/user');
const firm = require('../schemas/firm')
const { sendMail } = require('../helper/SendMail');
const authToken = require('../schemas/authToken');

router.post('/new',async (request,response)=>{
    const userDetails = request.body.userDetails;
     try{
        let firmDetails = {}
        const firmData = await firm.create(firmDetails);
        console.log("firm",firmData);
        userDetails["firm"] = firmData._id;
        const userData = await user.create(userDetails);
        response.status(200).send("user created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("user creation failed")
    }
})

router.post('/login',async (request,response)=>{
    try{
        console.log("login",request.body)
        const userDetails = request.body;
        const userData=await user.findOne({username:userDetails.username,password:userDetails.password}).select('-password');
        if(userData){
            response.status(200).json({isLoggedIn:true, msg:"Login Successfully.", userData:userData,status:true});
        }else{
            response.status(200).json({isLoggedIn:false, msg:"Invalid Credentials", status:false});
        }
    }catch(e){
        console.log(e);
        response.status(400).json({isLoggedIn:false, msg:"Something Went wrong",status:false})
    }
    
})

router.post('/isExist',async (request,response)=>{
    try{
        console.log(request.body);
        let {email,username} = request.body;
        let emailFound = false;
        let userNameFound = false;
        let emailData =await user.findOne({email:email});
        let userData = await user.findOne({username:username})
        if(emailData){
            emailFound = true;
        }
        if(userData){
            userNameFound = true
        }
        response.status(200).json({emailFound:emailFound,userNameFound:userNameFound});
    }catch(e){
        response.status(400).json({errorMessage:"Something went wrong"});
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

router.post('/reset_password/send_otp', async (request,response) => {
    try{
        const email = request.body.email;
        const userData = await user.findOne({email:email});
        if(!userData){
           return response.status(200).json({status:false, msg:"email address is not registered yet."});
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
                response.status(200).json({ status:true, msg:"mail sent successfully"});
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

router.get('/reset_password/verify_otp',async(request,response)=>{
    try{
        const email = request.query.email;
        const userOTP = request.query.otp;
        const userData = await user.findOne({email:email});
        const auth = await authToken.findOne({user_id:userData._id}).sort({createdAt:-1}).limit(1);
        if(auth && userData){
            if(auth.verification_code == userOTP){
                response.status(200).json({status:true, username:userData.username, msg:"OTP verified sucessfully"});
            }else{
                return response.status(200).json({status:false, msg:"Entered OTP is incorrect"});
            }
        }else{
            return response.status(200).json({status:false, msg:"OTP expired. please click Resend OTP"});
        }
    }catch(e){
        console.log(e);
        response.status(400).json({err:e, msg:"error"});
    }
})

router.patch('/reset_password',async(request,response)=>{
    try{
        const newPassword = request.body.password;
        const email = request.body.email;
        console.log("email : ",email," password : ",newPassword);
        await user.findOneAndUpdate({email:email}, { $set: {password : newPassword}});
        response.status(200).json({status:true, msg:"Password reseted successfully.."});
    }catch(e){
        console.log(e);
        response.status(400).json({err:e, msg:"error"});
    }
})

module.exports = router;
