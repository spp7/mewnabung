'use strict'

const mainMenu = function(client, event) {
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
  return client.replyMessage(event.replyToken, formatReply);
}

module.exports = {
  mainMenu
}
