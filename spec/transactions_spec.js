var frisby = require('frisby');

var URL = 'http://localhost:8080/api';

frisby.create('GET user johndoe')
  .get(URL + '/transactions/5794c591f1609b50b7db02cb')
  .expectStatus(200)
  .expectJSONTypes({
    receiverNumber: Number,
    receiver: String,
    senderNumber: Number,
    senderAccount: String,
    amount: Number,
    company: String,
  })
  .expectJSON({
    receiverNumber: 9103913,
    receiver: 'Ben',
    senderNumber: 2130093,
    senderAccount: 'BP',
    amount: 100,
    company: 'Andrew',
  })
.toss();


frisby.create('POST good data')
  .post(URL + '/transactions',
    { company: 'test company',
     amount: 100,
     senderAccount: 'Telleroo',
     senderNumber: 12329,
     receiver: 'newWorld',
     receiverNumber: 123913,
    },
    { json: true },
    { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
  .expectStatus(200)
  .expectHeader('Content-Type', 'application/json; charset=utf-8')
  .afterJSON(function (res) {
    /* include auth token in the header of all future requests */
    frisby.globalSetup({
      request: {
        headers: { 'x-access-token': res.token }
      }
    });
  })
.toss();
