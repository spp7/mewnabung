'use strict'

const axios = require('axios')

const goalsActions = require('./config/actions').goals
const line_template = require('./line-template')

const goals = function(client, event, unprocessedMessage) {
  let formatReply
  console.log('RESULT: ', unprocessedMessage.result)
  if (unprocessedMessage.stepIdx === goalsActions.steps.length) {
    console.log(unprocessedMessage.result)
    formatReply = line_template.replyMessageFormat(null, `OK! Targetmu sudah Bang Bingbung simpan! Semangat ya!`)
  }
  else {
    if (goalsActions.steps[unprocessedMessage.stepIdx].msg === "") {
      if  (goalsActions.steps[unprocessedMessage.stepIdx].idx === "deadline") {
        formatReply = line_template.replyMessageFormat("thumbnailImage", {
          //thumbnailImageUrl: `https://api.line.me/v2/bot/message/${unprocessedMessage.result[1]}/content`,
          thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
          title: "Goals",
          text: "Kapan kamu ingin bisa memiliki ini?",
          actions: [
            {
              type: "message",
              label: "1 bulan lagi",
              text: "1 bulan lagi"
            },
            {
              type: "message",
              label: "3 bulan lagi",
              text: "3 bulan lagi"
            },
            {
              type: "message",
              label: "6 bulan lagi",
              text: "6 bulan lagi"
            }
          ]
        })
        console.log('FORMAT REPLYYYYYY: ', formatReply)
      }
      else {
        formatReply = line_template.replyMessageFormat("thumbnailImage", {
          //thumbnailImageUrl: unprocessedMessage.result[1].length === 0 ? "https://example.com/bot/images/image.jpg" : unprocessedMessage.result[1].length,
          thumbnailImageUrl: "https://example.com/bot/images/image.jpg",
          title: "Goals",
          text: "Seberapa sering kamu ingin menabung?",
          actions: [
            {
              type: "message",
              label: "harian",
              text: "harian"
            },
            {
              type: "message",
              label: "mingguan",
              text: "mingguan"
            },
            {
              type: "message",
              label: "bulanan",
              text: "bulanan"
            }
          ]
        })
      }
    }
    else {
      formatReply = line_template.replyMessageFormat(null, goalsActions.steps[unprocessedMessage.stepIdx].msg)
    }
    return formatReply
  }
}

module.exports = goals
