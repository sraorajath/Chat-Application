const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const user = mongoose.Schema({
  email: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String
})
mongoose.model('Users', user)

const chatSchema = mongoose.Schema({
  room_id: mongoose.Schema.Types.Number,
  users: [{
    userId: mongoose.Schema.Types.ObjectId,
    email: mongoose.Schema.Types.String,
    name: mongoose.Schema.Types.String
  }],
  messages: [{
    senderId: mongoose.Schema.Types.ObjectId,
    text: mongoose.Schema.Types.String,
    datetime: mongoose.Schema.Types.Date,
  }]
})
mongoose.model('Chats', chatSchema)