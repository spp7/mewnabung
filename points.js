'use strict'

const pointsActions = require('./config/actions').points
const line_template = require('./line-template')

const points = function(client, event, unprocessedMessage) {
  let formatReply
  console.log('ulalalala im inside points')
  if (unprocessedMessage.stepIdx === pointsActions.steps.length) {
    console.log(unprocessedMessage.result.join(","))
    formatReply = line_template.replyMessageFormat('Poinmu untuk saat ini adalah 0. Hahaha')
  }
  else {
    formatReply = line_template.replyMessageFormat(pointsActions.steps[unprocessedMessage.stepIdx].msg)
  }
  console.log('FORMAT REPLY =====', formatReply)
  return formatReply
}

module.exports = points
