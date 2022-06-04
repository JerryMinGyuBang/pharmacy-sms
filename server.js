// // Express.js
// var express = require('express');
// var app = express();

// //Twilio
// require('dotenv').config()
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

// // set the view engine to ejs
// app.set('view engine', 'ejs');

// // use res.render to load up an ejs view file

// // index page
// app.get('/', function(req, res) {
//   res.render('pages/index');
// });

// // about page
// // app.get('/about', function(req, res) {
// //   res.render('pages/about');
// // });

// app.listen(8080);
// console.log('Server is listening on port 8080');

// Firebase
var Firebase = require('firebase'),
usersRef = new Firebase('https://pharmacy-sms-default-rtdb.firebaseio.com/Users/');

var numbers = [];
usersRef.on('child_added', function(snapshot) {
numbers.push( snapshot.val() );
  console.log( 'Added number ' + snapshot.val() );
});

// Twilio
var twilio = require('twilio')
require('dotenv').config();
var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
cronJob = require('cron').CronJob;

var numbers = [process.env.FROM, process.env.TO];

var textJob = new cronJob( '0 18 * * *', function(){
  for( var i = 0; i < numbers.length; i++ ) {
    client.messages.create( { to:numbers[i], from:process.env.FROM, body:'Hello! Hope you’re having a good day.'}, function( err, data ) {
      console.log( data.body );
    });
  }
},  null, true);


// Express
var express = require('express');
var app = express();
bodyParser = require('body-parser');
var MessagingResponse = require('twilio').twiml.MessagingResponse;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
// app.get('/', function(req, res) {
//   res.render('pages/index');
// });

// about page
// app.get('/about', function(req, res) {
//   res.render('pages/about');
// });

// bodyParser middleware for POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// route for TwiML
app.post('/message', function (req, res) {
  var resp = new MessagingResponse();
  if( req.body.Body.trim().toLowerCase() === 'subscribe' ) {
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
      resp.message('You already subscribed!');
    } else {
      resp.message('Thank you, you are now subscribed. Reply "STOP" to stop receiving updates.');
      usersRef.push(fromNum);
    }
  } else {
    resp.message('Welcome to Daily Updates. Text "Subscribe" receive updates.');
  }

  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());

});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

// npm i express
// npm i body-parser