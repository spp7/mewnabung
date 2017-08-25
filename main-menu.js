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
}

const poin = function(client, event) {
  let myPoin = 0
  let message = {
    type: 'text',
    text: `poin mu untuk saat ini adalah ${myPoin}`
  }
  client.replyMessage(event.replyToken, message)
  .then(result => {
    var formatReply = 'helo'
    console.log(result);
    return result
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = {
  mainMenu,
  goals,
  poin,
}
