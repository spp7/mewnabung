'use strict'

const pointsActions = require('./config/actions').points
const line_template = require('./line-template')

const points = function(client, event, unprocessedMessage) {
  if (unprocessedMessage.stepIdx === pointsActions.steps.length) {
    console.log(unprocessedMessage.result.join(","))
    formatReply = line_template.replyMessageFormat('Poinmu untuk saat ini adalah 0. Hahaha')
  }
  else {
    formatReply = line_template.replyMessageFormat(pointsActions.steps[unprocessedMessage.stepIdx].msg)
  }
  return formatReply
}

module.exports = points
