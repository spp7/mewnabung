'use strict';

const line_template = require('./line-template')
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
    var messagesCarousel = {
        "type": "buttons",
        "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
        "title": "Menu",
        "text": "Please select",
        "actions": [
            {
              "type": "message",
              "label": "Buy",
              "data": "action=buy&itemid=123"
            },
            {
              "type": "message",
              "label": "Add to cart",
              "data": "action=add&itemid=123"
            },
            {
              "type": "uri",
              "label": "View detail",
              "uri": "http://example.com/page/123"
            }
        ]
    }
    formatReply = line_template.replyMessageFormat("thumbnailImage")
    console.log('----------------');
    console.log(formatReply);
  }

  else {
    formatReply = line_template.replyMessageFormat(event.message.text)
  }

  return client.replyMessage(event.replyToken, formatReply);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
