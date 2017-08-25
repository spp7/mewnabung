'use strict';

const line_template = require('./line-template');
const menu = require('./main-menu')
const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  var formatReply
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  else if (event.message.text === 'Menu'){
    menu.mainMenu(client, event)
  } else if (event.message.text === 'Goals'){
    menu.goals(client, event)
  }

  else {
    var callMe = "Hallo ini Bang Bingbung, panggil aku saja ya ('Halo Bang Bing!') untuk mengajakku beraktifitas"
    formatReply = line_template.replyMessageFormat(callMe)
  }

  return client.replyMessage(event.replyToken, formatReply);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
