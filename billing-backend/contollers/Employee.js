const express=require('express')
var router = express.Router();
const employee = require('../schemas/employee')

router.post('/new',async (request,response)=>{
    const employeeDetails = request.body.employeeDetails;
     try{
        const employeeData = await employee.create(employeeDetails);
        response.status(200).send("empoyee created successfully created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("user creation failed")
    }
})


module.exports = router;