const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required:true
  },
//   Category To be added90
  party:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'party'
  },
  firm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'firm'
  },
  price:{
    type:Number,
  },
  is_deleted:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
});

const item = mongoose.model("item", itemSchema);

module.exports = item;