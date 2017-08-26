'use strict'

const line = require('@line/bot-sdk')
const express = require('express')
const axios = require('axios')

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
  console.log('EVENT ======== ', event)
  var formatReply

  //let onProgressUser = urplMsg.find((user) => {
  //  return user.userId === event.source.userId
  //})

  axios.get(`182.16.165.75:3001/api/message/${event.source.userId}`)
    .then((response) =>{
      //if (onProgressUser) {
      console.log(response.data)
      //if(response.data) {
      //  let msgIdx = urplMsg.indexOf(onProgressUser)
      //  if (Date.now() - onProgressUser.timestamp > 300000) {
      //    urplMsg.splice(msgIdx, 1)
      //    formatReply = handleOtherText()
      //  }
      //  else {
      //    console.log('masih kedetect')
      //    urplMsg[msgIdx].stepIdx += 1
      //    if (event.type === 'message') {
      //      event.message.text ? urplMsg[msgIdx].result.push(event.message.text) : urplMsg[msgIdx].result.push(event.message.id)
      //      switch (urplMsg[msgIdx].action) {
      //        case 'points':
      //          formatReply = points(client, event, urplMsg[msgIdx])
      //          if (urplMsg[msgIdx].stepIdx === actions.points.steps.length) {
      //            urplMsg.splice(msgIdx, 1)
      //          }
      //          break
      //        case 'goals':
      //          formatReply = goals(client, event, urplMsg[msgIdx])
      //          if (urplMsg[msgIdx].stepIdx === actions.points.steps.length) {
      //            urplMsg.splice(msgIdx, 1)
      //          }
      //          break
      //      }
      //    }
      //    else {
      //      formatReply = handleOtherText()
      //    }
      //  }
      //}

      //else {
      //  console.log('AKJAKJDSASKJDNSAKJDBASKJDSAKJDA', urplMsg)
      //  switch (event.type) {
      //    case 'message':
      //      switch (event.message.text) {
      //        case 'Poin':
      //          urplMsg.push(
      //            {
      //              userId: event.source.userId,
      //              action: 'points',
      //              stepIdx: 1,
      //              result: []
      //            }
      //          )
      //          formatReply = points(client,event, urplMsg[urplMsg.length-1]) // hati-hati ini bisa dapat user lain loh kalau main cepet-cepetan dan banyak yang mengakses
      //          break
      //        case 'Goals':
      //          urplMsg.push(
      //            {
      //              userId: event.source.userId,
      //              action: 'goals',
      //              stepIdx: 1,
      //              result: []
      //            }
      //          )
      //          formatReply = goals(client,event, urplMsg[urplMsg.length-1])
      //          break
      //        default:
      //          console.log('ULANG LAGI')
      //          formatReply = handleOtherText()
      //      }
      //      break
      //    default:
      //      formatReply = handleOtherText()
      //  }
      //}
      formatReply = handleOtherText()

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
    })
    .catch ((error) => {
      console.log(error)
    })
}

function handleOtherText() {
  var initialization = "Halo! Ayo belajar kelola uang bersama Bang Bingbung! Silakan pilih menu utama atau tulis 'Hi Bang!' untuk mengajak saya belajar bersama."
  return line_template.replyMessageFormat(null, initialization)
}

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
})
