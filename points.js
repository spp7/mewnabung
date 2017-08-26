'use strict'

const pointsActions = require('./config/actions').points
const line_template = require('./line-template')

const points = function(client, event, unprocessedMessage) {
  let formatReply
  console.log('ulalalala im inside points')
  if (unprocessedMessage.stepIdx === pointsActions.steps.length) {
    console.log(unprocessedMessage.result.join(","))
    formatReply = line_template.replyMessageFormat(null, 'Poinmu untuk saat ini adalah 0. Hahaha')
  }
  else {
    console.log('PESAAAAN', pointsActions.steps)
    console.log('IDX ===> ', unprocessedMessage.stepIdx)
    console.log('PESAAAAN', pointsActions.steps[unprocessedMessage.stepIdx].msg)
    formatReply = line_template.replyMessageFormat(null, pointsActions.steps[unprocessedMessage.stepIdx].msg)
  }
  console.log('FORMAT REPLY =====', formatReply)
  return formatReply
}

module.exports = points
