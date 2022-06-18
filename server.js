// // express, bodyParser
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// Twilio
const twilio = require('twilio')
require('dotenv').config();
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
cronJob = require('cron').CronJob;
const numbers = [process.env.TO];
const textJob = new cronJob( '* * * * *', function(){
  for( var i = 0; i < numbers.length; i++ ) {
    client.messages.create( { to:numbers[i], from:process.env.FROM, body:'Hello! Hope you’re having a good day.'}, function( err, data ) {
      console.log( data.body );
    });
  }
},  null, true);
app.post('/message', function (req, res) {
  var resp = new MessagingResponse();
  resp.message('Thanks for subscribing!');
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});
const server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

// To start server
// Start ngrok one seperate terminal by: ngrok http 3000
// On Twilio: Active Numbers -> Click Our number -> Scroll down to messaging services -> write ngroklink/messaging on http post -> Save.
// Server should now work.