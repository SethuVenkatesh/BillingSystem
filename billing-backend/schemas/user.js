const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  profile_url:{
    type:String
  },
  mobile_number:{
    type:Number,
    required:true
  },
  firm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'firm'
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
});

const user = mongoose.model("user", userSchema);

module.exports = user;