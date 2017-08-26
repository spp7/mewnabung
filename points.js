'use strict'

const pointsActions = require('./config/actions').points
const line_template = require('./line-template')

const points = function(client, event, unprocessedMessage) {
  let formatReply
  if (unprocessedMessage.stepIdx === pointsActions.steps.length) {
    formatReply = line_template.replyMessageFormat(null, `Hi ${unprocessedMessage.result[0]}, poinmu untuk saat ini adalah 0. Hahaha')
  }
  else {
    formatReply = line_template.replyMessageFormat(null, pointsActions.steps[unprocessedMessage.stepIdx].msg)
  }
  return formatReply
}

module.exports = points
