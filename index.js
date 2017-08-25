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
    var messagesCarousel = [
      {
        "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
        "title": "Games",
        "text": "Mainkan games seru, dan dapatkan poin!",
        "actions": [
          {
            "type": "message",
            "label": "Hangman",
            "text": "Hangman"
          },
          {
            "type": "message",
            "label": "Quiz BCA",
            "text": "Quiz BCA"
          }
        ]
      },
      {
        "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
        "title": "Akun Kamu",
        "text": "Lihat detail akunmu",
        "actions": [
          {
            "type": "message",
            "label": "Cek Saldo",
            "text": "Cek Saldo"
          },
          {
            "type": "message",
            "label": "Alokasi Dana",
            "text": "Alokasi Dana"
          },
          {
            "type": "message",
            "label": "Set Goals",
            "text": "Set Goals"
          },
          {
            "type": "message",
            "label": "Cek Poin",
            "text": "Cek Poin"
          }
        ]
      }
    ]
    formatReply = line_template.replyMessageFormat("carousel", messagesCarousel)
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
