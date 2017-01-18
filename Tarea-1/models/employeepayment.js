const mongoose = require('mongoose');
require('mongoose-double') (mongoose);
const Schema = mongoose.Schema;

const UserPayment = new Schema({
  Id : {type :String , unique : true},
  IdType : Number,
  Account : Number,
  Amount :  { type:  Schema.Types.Double}
});

module.exports=mongoose.model('UserPayment',UserPayment,'userpayment');
