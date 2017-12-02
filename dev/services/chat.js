const mongoose = require('mongoose')
const user = mongoose.model('Users')
const chat = mongoose.model('Chats')

class Chat {
  CheckUser(userData) {
    return new Promise(function(resolve, reject) {
      user.findOne({email:userData.email}, function(err, res) {
        if(err) {
          return reject(err)
        } else {
          if(res == null) {
            const User = new user(userData)
            User.save(function(err, users) {
              users.newUser = {}
              if(err) {
                return reject(err)
              } else {
                users.newUser = "true"
                console.log(users)
                // resolve(users)
              }
            })
          } else {
            resolve(res)
          }
        }
      })
    })
  }

  fetchChatDetails(userId) {
    return new Promise(function(resolve, reject) {
      chat.findOne({users: {$elemMatch: { userId: userId } } }, function(err, res) {
        if(err) {
          return reject(err)
        } else {
          console.log(res)
        }
      })
    })
  }
}

module.exports = new Chat()