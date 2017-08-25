'use strict';

const carouselTemplate = function(messages) {
  return {
    "type": "template",
    "altText": "this is a carousel template",
    "template": {
      "type": "carousel",
      "columns": messages
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
      console.log(messages);
      replyFormat = {
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
          "type": "buttons",
          "thumbnailImageUrl": messages.thumbnailImageUrl,
          "title": messages.title,
          "text": messages.text,
          "actions": messages.actions
        }
      }
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
