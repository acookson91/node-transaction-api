require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Transaction = require('./app/models/transactions');
var http = require('http');

mongoose.connect('mongodb://'+ process.env.USERNAME +':'+ process.env.PASSWORD +'@ds023325.mlab.com:23325/api-test');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();
var count;

router.use(function(req,res,next){
  console.log('We recieved a transaction');
  Transaction.collection.find().count()
  .then(function(numItems){
    count = numItems + 1;
  });
  next();
});

router.get('/', function(req,res){
  res.json({message: 'well done'});
});

router.route('/transactions')

.post(function(req,res){
  var transaction = new Transaction();
  transaction.id = count;
  transaction.company = req.body.company;
  transaction.amount = req.body.amount;
  transaction.senderAccount = req.body.senderAccount;
  transaction.senderNumber = req.body.senderNumber;
  transaction.receiver = req.body.receiver;
  transaction.receiverNumber = req.body.receiverNumber;
  transaction.save(function(err,transaction){
    if(err)
      res.send(err);
      console.log(transaction);
    res.json({message:'Transaction created'});

  });
});

router.route('/transactions/:transaction_id')

  .get(function(req,res){
    Transaction.findById(req.params.transaction_id, function(err, trans){
      if (err)
        res.send(err);
      res.json(trans);
    });
  });


app.use('/api', router);

app.listen(port);
