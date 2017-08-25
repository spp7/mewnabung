'use strict';

const lineTemplate = require('./line-template');
const line = require('@line/bot-sdk');
const express = require('express');
// const menu = require('./main-menu');

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
    formatReply = {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
          "type": "carousel",
          "columns": [
            {
              "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
              "title": "Games",
              "text": "Mainkan games seru, dan dapatkan poin!",
              "actions": [
                {
                  "type": "postback",
                  "label": "Hangman",
                  "data": "hangman",
                  "text": "Hangman"
                },
                {
                  "type": "postback",
                  "label": "Quiz BCA",
                  "text": "Quiz BCA",
                  "data": "Quiz BCA"
                }
              ]
            },
            {
              "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
              "title": "Akun Kamu",
              "text": "Lihat detail akunmu",
              "actions": [
                {
                  "type": "postback",
                  "label": "Cek Saldo",
                  "text": "Cek Saldo",
                  "data": "Cek Saldo"
                },
                {
                  "type": "postback",
                  "label": "Alokasi Dana",
                  "text": "Alokasi Dana",
                  "data": "Alokasi Dana"
                },
                {
                  "type": "postback",
                  "label": "Set Goals",
                  "text": "Set Goals",
                  "data": "Set Goals"
                },
                {
                  "type": "postback",
                  "label": "Cek Poin",
                  "text": "Cek Poin",
                  "data": "Cek Poin"
                }
              ]
            }
          ]
      }
    }
    return client.replyMessage(event.replyToken, formatReply)
  }

  else {
    formatReply = lineTemplate.replyMessageFormat(event.message.text)
    return client.replyMessage(event.replyToken, formatReply);
  }

}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
