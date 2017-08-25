'use strict'

const mainMenu = function(client, event) {
  let formatReply = {
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
                "text": "hangman"
              },
              {
                "type": "postback",
                "label": "Quiz BCA",
                "data": "quiz",
                "text": "Coba Quiz BCA"
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
                "data": "ceksaldo",
                "text": "Cek Saldo"
              },
              {
                "type": "postback",
                "label": "Alokasi Dana",
                "data": "hangman",
                "text": "Alokasi Dana"
              },
              {
                "type": "message",
                "label": "Set Goals",
                "text": "Set Goals"
              }
            ]
          }
        ]
    }
  }
  client.replyMessage(event.replyToken, formatReply)
  .then(result => {
    return result
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = {
  mainMenu
}
