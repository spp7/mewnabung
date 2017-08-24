'use strict';

const replyMessageFormat = function (type) {
  const replyFormat
  switch (type) {
    case type == "confirm":
      replyFormat = {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            "text": "Are you sure?",
            "actions": [
                {
                  "type": "message",
                  "label": "Yes",
                  "text": "yes"
                },
                {
                  "type": "message",
                  "label": "No",
                  "text": "no"
                }
            ]
        }
      }
      break;
      case type == "thumbnailImageUrl":
        replyFormat = {
          "type": "template",
          "altText": "this is a buttons template",
          "template": {
              "type": "buttons",
              "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
              "title": "Menu",
              "text": "Please select",
              "actions": [
                  {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                  },
                  {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                  },
                  {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                  }
              ]
          }
        }
      break;
      case type == "carousel":
        replyFormat = {
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
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
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
      break;
    default:
      replyFormat = { type: 'text', text: type };
  }
  return replyFormat
}

module.exports = {
  replyMessageFormat
}
