const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  GST_number: {
    type: Number,
    default: 0,
  },
});

const company = mongoose.model("company", companySchema);

module.exports = company;