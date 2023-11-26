const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema({
  user_id:{
    type:mongoose.Schema.ObjectId,
    required:true
  },
  verification_code:{
    type:Number,
    require:true
  }
},
{
  timestamps:true
});

authTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const authToken = mongoose.model("authToken", authTokenSchema);

module.exports = authToken;