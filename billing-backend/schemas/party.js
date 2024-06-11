const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  party_name: {
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
  firm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'firm'
  },
  email_id:{
    type:String,
    default:"",
    required:true
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
  GST_number: {
    type: String, 
    default:"", 
  },
  mobile_number:{
    type:Number,
    default:"",
    required:true
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
    required:true
  },
  bank_branch:{
    type:String,
    default:"",
    required:true
  },
  account_number:{
    type:Number,
    default:"",
    required:true
  },
  IFSC_code:{
    type:String,
    default:"",
    required:true
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
});

const party = mongoose.model("party", partySchema);

module.exports = party;