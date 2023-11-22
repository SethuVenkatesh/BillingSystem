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
    required:true
  },
  profile_url:{
    type:String,
    required:true,
  },
  mobile_number:{
    type:Number,
    required:true,
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
});

const user = mongoose.model("company", userSchema);

module.exports = user;