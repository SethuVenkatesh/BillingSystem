const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const itemSchema = new mongoose.Schema({
  item_name:{
      type:String,
      required:true
  },
  price:{
      type:Number,
      required:true
  },
  quantity:{
      type:Number,
      required:true
  }
})


const paymentDetailSChema = new mongoose.Schema({
  items:[itemSchema],
  subTotal: {
      type:Number,
      required:true
  },
  totalPrice: {
      type:Number,
      required:true
  },
  SGSTPrice: {
      type:Number,
      required:true
  },
  CGSTPrice: {
      type:Number,
      required:true
  },
  SGSTPer: {
      type:Number,
  },
  CGSTPer: {
      type:Number,
  },
  includeGST: {
      type:Boolean,
      required:true,
      default:false
  },
  invoiceDate: {
      type:String,
      required:true
  },
  is_paid:{
    type:Boolean,
    default:false
  }

})

const partySchema = new mongoose.Schema({
  party_name: {
      type: String,
      required:true,
    },
    email_id:{
      type:String,
      default:"",
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
    GST_number: {
      type: String, 
      default:"",
    },
    mobile_number:{
      type:Number,
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
})

const SalesInvoiceSchema = new mongoose.Schema({
  invoice_no: { type: Number },
  payment_details:paymentDetailSChema,
  party:partySchema,
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

SalesInvoiceSchema.plugin(AutoIncrement, {start_seq: 1, inc_field: 'invoice_no' });


const salesInvoice = mongoose.model("sales_invoice", SalesInvoiceSchema);

module.exports = salesInvoice;