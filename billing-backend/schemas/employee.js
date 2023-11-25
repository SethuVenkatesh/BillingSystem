const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  employee_name: {
    type: String,
    required:true
  },
  date_of_birth:{
    type: Date,
    required:true
  },
  profile_url:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  pincode:{
    type:Number,
    required:true
  },
  mobile_number:{
    type:Number,
    required:true
  },
  bank_name:{
    type:String,
  },
  bank_branch:{
    type:String,
  },
  account_number:{
    type:Number,
  },
  IFSC_code:{
    type:String,
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
});

const company = mongoose.model("employee", companySchema);

module.exports = company;