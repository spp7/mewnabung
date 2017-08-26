'use strict'

const line_template = require('./line-template');

const goals = function(client, event) {
  let formatReply = line_template.replyMessageFormat("thumbnailImage", {
    "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
    "title": "Goals",
    "text": "Plan yang ingin kamu capai",
    "actions": [
      {
        "type": "message",
        "label": "List Goals saya",
        "text": "List Goals saya"
      },
      {
        "type": "message",
        "label": "Buat Goal Baru",
        "text": "Buat Goal Baru"
      }
    ]
  })

  client.replyMessage(event.replyToken, formatReply)
    .then(result => {
      return result
    })
    .catch(err => {
      console.log(err)
    })
};

module.exports = goals
