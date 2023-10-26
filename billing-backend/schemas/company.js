const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  logo:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required :true,
  },
  state:{
    type:String,
    required :true,
  },
  pincode:{
    type:Number,
    required :true,
  },
  mobile_number:{
    type:Number,
    required:true,
  },
  alt_mobile_number:{
    type:Number,
    required:true,
  },
  GST_number: {
    type: Number,
    default: 0,
    required:true,
  },
  bank_name:{
    type:String,
    required:true,
  },
  bank_branch:{
    type:String,
    required:true,
  },
  account_number:{
    type:Number,
    required:true,
  },
  IFSC_code:{
    type:String,
    required:true,
  },
});

const company = mongoose.model("company", companySchema);

module.exports = company;