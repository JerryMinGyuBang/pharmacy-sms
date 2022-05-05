require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Sexy',
     from: '+19896621518',
     to: '+14167865306'
   })
  .then(message => console.log(message.sid));
