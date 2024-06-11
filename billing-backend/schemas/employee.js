const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_name: {
    type: String,
    required:true
  },
  date_of_birth:{
    type: String,
    required:true
  },
  firm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'firm'
  },
  age:{
    type:Number,
  },
  default_profile_url:{
    type:String,
    default:"https://res.cloudinary.com/dkjcfh7oj/image/upload/v1713694054/employees/dzvchfdjt59hdylnmakh.png"
  },
  profile_url:{
    type:String,
    default:""
  },
  gender:{
    type:String,
    required:true
  },
  email_id:{
    type:String,
    default:""
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
  alt_mobile_number:{
    type:Number,
    default:""
  },
  bank_name:{
    type:String,
    default:""
  },
  bank_branch:{
    type:String,
    default:""
  },
  account_number:{
    type:Number,
    default:""
  },
  IFSC_code:{
    type:String,
    default:""
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;