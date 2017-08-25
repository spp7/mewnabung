'use strict';

const carouselTemplate = function(messages) {
  return {
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
              "text": "Hangman",
              "data": "Hangman"
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
}

const thumbnailImage = function(message) {
  return {
    "type": "template",
    "altText": "this is a buttons template",
    "template": {
      "type": "buttons",
      "thumbnailImageUrl": message.thumbnailImageUrl,
      "title": message.title,
      "text": message.text,
      "actions": message.actions
    }
  }
}

const confirm = function(message) {
  return {
    "type": "template",
    "altText": "this is a confirm template",
    "template": {
      "type": "confirm",
      "text": message,
      "actions": message.actions
    }
  }
}

const replyMessageFormat = function(type, messages) {
  var replyFormat
  switch (type) {
    case "confirm":
      replyFormat = confirm(messages)
      break;
    case "thumbnailImage":
      replyFormat = thumbnailImage(messages)
      break;
    case "carousel":
      replyFormat = carouselTemplate(messages)
      break;
    default:
      replyFormat = { type: 'text', text: type };
  }
  return replyFormat
}

module.exports = {
  replyMessageFormat
}
