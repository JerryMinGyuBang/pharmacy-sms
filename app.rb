require 'rubygems'
require 'sinatra'

get '/inbound' do
  content_type 'text/xml'
  '<Response><Message>Touchdown, Bo Jackson!</Message></Response>'
end

# To start server
# ngrok 4567
# Link to Twilio GET Response