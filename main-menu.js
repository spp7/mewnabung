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
    text: `poinmu untuk saat ini adalah ${myPoin}, tukarkan poinmu dengan reward menarik berikut!`
  }
  client.replyMessage(event.replyToken, message)
  .then(() => {
    let arrMessage = [{
      type: 'text',
      text: `poinmu untuk saat ini adalah ${myPoin}, tukarkan poinmu dengan reward menarik berikut!`
    }]
    let formatReply = line_template.replyMessageFormat("carousel", [
      {
        "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
        "title": "MELT Jakarta",
        "text": "Discount 20% for all items",
        "actions": [
          {
            "type": "postback",
            "label": "selengkapnya",
            "uri": "http://example.com/page/123"
          }
        ]
      },
      {
        "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
        "title": "Han Gang Garden",
        "text": "Diskon 25% Food Only",
        "actions": [
          {
            "type": "postback",
            "label": "selengkapnya",
            "uri": "http://example.com/page/123"
          }
        ]
      }
    ])
    // arrMessage.push(formatReply)

    console.log('--------');
    console.log(arrMessage);
    console.log(event.source.userId);
    client.pushMessage(event.source.userId, arrMessage)
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
