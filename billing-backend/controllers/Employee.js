const express= require('express')
var router = express.Router();
const employee = require('../schemas/employee')

router.post('/new',async (request,response)=>{
    const employeeDetails = request.body.employeeDetails;
     try{
        const employeeData = await employee.create(employeeDetails);
        response.status(200).send("employee created successfully")
    }catch(e){
        console.log("err",e)
        response.status(500).send("Employee creation failed")
    }
})

router.get("/all/:id",async (request,response)=>{
    let firmId=request.params.id
    try{
        const allEmployees=await employee.find({is_deleted : false,firm:firmId});
        response.status(200).send(allEmployees)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving employees")
    }
})


router.get("/details/:id",async (request,response)=>{
    try{
        let employeeId=request.params.id
        const employeeDetail=await employee.findOne({_id:employeeId});
        response.status(200).send(employeeDetail)
    }catch(e){
        console.log(e);
        response.status(400).send("error in retriving employee")
    }
})

router.put("/update/:id",async (request,response)=>{
    try{
        let employeeId=request.params.id
        const employeeDetails = request.body.employeeDetails;
        console.log(employeeDetails)
        const updatedEmployee=await employee.findByIdAndUpdate(
            employeeId,
            employeeDetails,
            {new: true},
        );
        response.status(200).send(updatedEmployee)
    }catch(e){
        console.log(e);
        response.status(400).send("error in updating employee")
    }
})

router.delete("/delete/:id",async (request,response)=>{
    try{
        let employeeId=request.params.id
        const updatedEmployee=await employee.findByIdAndUpdate(
            employeeId,
            {is_deleted:true},
            {new: true},
        );
        response.status(200).send(updatedEmployee)
    }catch(e){
        console.log(e);
        response.status(400).send("error in deleting employee")
    }
})

module.exports = router;