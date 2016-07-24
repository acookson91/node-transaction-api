var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
  id: Number,
  company: {type:String, min:1, max:50},
  amount: Number,
  senderAccount: String,
  senderNumber: Number,
  receiver: String,
  receiverNumber: Number,
  created: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Transaction', transactionSchema);
