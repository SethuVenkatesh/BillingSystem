const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const dotenv = require("dotenv")
const MyModel = require("./schemas/salesInvoice")
//initialzing app
const app=express()
dotenv.config()


//mongodb connection
mongoose.connect(process.env.mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true})
.then(async ()=>{
    // await resetCounter()
    console.log("mongodb connected")

})
.catch((err)=>{console.log("err:",err)});



const updateDocuments = async () => {
    try {
        await mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Log the documents before the update
        const beforeUpdate = await MyModel.find({});
        console.log('Documents before update:', beforeUpdate);


        const result = await MyModel.updateMany(
            {}, // Filter to select all documents
            { $set: { payment: '' } } // Add new field with default value
        );
        
        console.log(result);

        // Log the documents after the update
        const afterUpdate = await MyModel.find({});
        console.log('Documents after update:', afterUpdate);


    } catch (err) {
        console.error('Error updating documents:', err);
    } finally {
        // Close the connection after the operation
        await mongoose.connection.close();
    }
};

// updateDocuments();

// Controllers
const User = require("./controllers/User")
const Employee = require("./controllers/Employee")
const Firm = require("./controllers/Firm")
const Party = require("./controllers/Party")
const Item = require("./controllers/Items")
const Sales = require("./controllers/Sales")
//applying middleware cors and bodyparser json
app.use(express.json());
app.use(cors())

//routes 
app.use("/user",User)
app.use("/employee",Employee)
app.use("/firm",Firm)
app.use("/party",Party)
app.use("/item",Item)
app.use("/sales",Sales)
//listening to port
app.listen(process.env.port,(req,res)=>{
    console.log(`Listening on port ${process.env.port}`)
})


