'use strict'

const line = require('@line/bot-sdk')
const express = require('express')

const actions = require('./config/actions')
const line_template = require('./line-template')
const menu = require('./main-menu')
const goals = require('./goals')
const points = require('./points')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
}

var urplMsg = [
  {
    userId: '',
    action: '',
    stepIdx: '',
    result: []
  }
];

// create LINE SDK client
const client = new line.Client(config)

// create Express app
const app = express()

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
})

// event handler
function handleEvent(event) {
  console.log('holalallalalla', event)
  console.log('UNREPLIED MESSAGE', urplMsg)
  var formatReply

  let onProgressUser = urplMsg.find((user) => {
    return urplMsg.userId === event.source.userId
  })

  if (onProgressUser) {
    let msgIdx = urplMsg.indexOf(onProgressUser)
    if (Date.now() - onProgressUser.timestamp > 300000) {
      urplMsg.splice(msgIdx, 1)
      formatReply = handleOtherText()
    }
    else {
      urplMsg[msgIdx].stepIdx += 1
      if (event.type === 'message' && event.message.type === 'text') {
        urplMsg[msgIdx].result.push(event.message.text)
        switch (urplMsg[msgIdx].action) {
          case 'points':
            formatReply = points(client, event, urplMsg[msgIdx])
            break
        }
      }
      else {
        formatReply = handleOtherText()
      }
    }
  }

  else {
    switch (event.type) {
      case 'message':
        switch (event.message.text) {
          case 'Poin':
            console.log('POIN LOH!')
            urplMsg.push(
              {
                userID: event.source.userId,
                action: 'points',
                stepIdx: 1,
                result: []
              }
            )
            console.log('IS IT BEING PUSHED?????', urplMsg)
            formatReply = points(client,event, urplMsg[urplMsg.length-1])
            console.log('FORMAT REPLY DI INDEX   ', formatReply)
            break
          default:
            formatReply = handleOtherText()
        }
        break
      default:
        formatReply = handleOtherText()
    }
  }

  return client.replyMessage(event.replyToken, formatReply)

  //  if (event.type !== 'message' || event.message.type !== 'text') {
  //    // ignore non-text-message event
  //    return Promise.resolve(null)
  //  }
  //
  //  else if (event.message.text === 'Menu' || event.message.text.toLowerCase() === 'halo bang bing'){
  //    menu.mainMenu(client, event)
  //  } else if (event.message.text === 'Goals'){
  //    goals(client, event)
  //  } else if (event.message.text === 'Poin'){
  //    menu.poin(client, event)
  //  }
  //
  //  else {
  //    var callMe = "Hallo ini Bang Bingbung, panggil aku saja ya ('Halo Bang Bing!') untuk mengajakku beraktifitas"
  //    formatReply = line_template.replyMessageFormat(callMe)
  //  }
  //
  //  return client.replyMessage(event.replyToken, formatReply)
}

function handleOtherText() {
  var initialization = "Halo! Ayo belajar kelola uang bersama Bang Bingbung! Silakan pilih menu utama atau tulis 'Hi Bang!' untuk mengajak saya belajar bersama."
  return line_template.replyMessageFormat(null, initialization)
}

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
