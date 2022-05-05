const accountSid = 'AC17d7efabf5f3b5109bf1a462bfcd712d';
const authToken = '6c9ef3fafda35bcf97dea4519a334aea';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Sexy',
     from: '+19896621518',
     to: '+14167865306'
   })
  .then(message => console.log(message.sid));
