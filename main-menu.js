'use strict'

const line_template = require('./line-template');

const mainMenu = function(client, event) {

  let formatReply = line_template.replyMessageFormat("carousel", [
    {
      "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
      "title": "Games",
      "text": "Mainkan games seru, dan dapatkan poin!",
      "actions": [
        {
          "type": "message",
          "label": "Hangman",
          "text": "hangman"
        },
        {
          "type": "message",
          "label": "Quiz BCA",
          "text": "Coba Quiz BCA"
        },
        {
          "type": "message",
          "label": " ",
          "text": "Silahkan Pilih Menu"
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
          "label": "Cek Poin",
          "text": "Cek Poin"
        }
      ]
    }
  ])

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
