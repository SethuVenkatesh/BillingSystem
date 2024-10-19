const express=require('express')
var router = express.Router();
const invoice = require("../schemas/salesInvoice");

router.post('/new_invoice',async (request,response)=>{
    const invoiceDetails = request.body.invoiceData;
    console.log(invoiceDetails);
     try{
        const invoiceData = await invoice.create(invoiceDetails);
        response.status(200).send("invoice added successfully");
    }catch(e){
        console.log("err",e)
        response.status(500).send("error in adding invoice")
    }
})

router.get('/all_invoice',async (request,response)=>{
    const QueryData = request.query;
    console.log(QueryData);
     try{
        const allInvoices = await invoice.find({firm:QueryData.firm_id});
        
        response.status(200).send(allInvoices)
    }catch(e){
        console.log("err",e)
        response.status(500).send("error in retriving invoices")
    }
})

router.put('/edit_invoice',async (request,response)=>{
    try{
        const invoiceId = request.query.invoice_id;
        const invoiceDetails = request.body.invoiceData;
        const updatedInvoice =await invoice.findByIdAndUpdate(
            invoiceId,
            invoiceDetails,
            {new: true},
        );
        response.status(200).send(updatedInvoice)
    }
    catch(e){
        console.log(e);
        response.status(500).send("error in updating invoice")
    }
})

module.exports = router;