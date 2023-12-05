const express= require('express')
var router = express.Router();
const employee = require('../schemas/employee')

router.post('/new',async (request,response)=>{
    const employeeDetails = request.body.employeeData;
     try{
        const employeeData = await employee.create(employeeDetails);
        response.status(200).send("employee created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("Employee creation failed")
    }
})


module.exports = router;