const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  firm_name: {
    type: String,
    required:true,
    default:"My Company"
  },
  default_logo_url:{
    type:String,
    default:"https://res.cloudinary.com/dkjcfh7oj/image/upload/v1713684716/firms/building_1_jc8pct.png"
  },
  logo_url:{
    type:String,
    default:"",
  },
  email_id:{
    type:String,
    default:"",
  },
  address:{
    type:String,
    default:"",
  },
  city:{
    type:String,
    default:"",
  },
  state:{
    type:String,
    default:"",
  },
  pincode:{
    type:Number,
    default:"",
  },
  mobile_number:{
    type:Number,
    default:"",
  },
  alt_mobile_number:{
    type:Number,
    default:"",
  },
  GST_number: {
    type: String, 
    default:"", 
  },
  bank_name:{
    type:String,
    default:"",
  },
  bank_branch:{
    type:String,
    default:"",
  },
  account_number:{
    type:Number,
    default:"",
  },
  IFSC_code:{
    type:String,
    default:"",
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
});

const firm = mongoose.model("firm", firmSchema);

module.exports = firm;