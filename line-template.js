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
            "title": "this is menu",
            "text": "description",
            "actions": [
                {
                    "type": "message",
                    "label": "Buy",
                    "data": "action=buy&itemid=111"
                },
                {
                    "type": "message",
                    "label": "Add to cart",
                    "data": "action=add&itemid=111"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/111"
                }
            ]
          },
          {
            "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
            "title": "this is menu",
            "text": "description",
            "actions": [
                {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=222"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=222"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/222"
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
