require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Did you take your medication? Reply YES or NO',
     from: process.env.FROM,
     to: process.env.TO
   })
  .then(message => console.log(message.sid));
