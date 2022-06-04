require 'rubygems'
require 'sinatra'

get '/inbound' do
  content_type 'text/xml'
  '<Response><Message>Hello!</Message></Response>'
end

# To start server
# export GEM_HOME="$HOME/.gem"
# ruby app.rb
# ngrok http 4567
# Link to Twilio GET Response