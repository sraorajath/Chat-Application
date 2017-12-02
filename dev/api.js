const chatService = require('./services/chat')
module.exports = function(app, io) {
  app.post('/login', function(req, res) {
    chatService.CheckUser(req.body)
      .then(function(result) {
        res.send({
          status: 200,
          message: 'success',
          data: result
        })
      })
      .catch(function(err) {
        console.log(err)
      })
  })

  app.get('/getChatDetails/:userId', function(req, res) {
    chatService.fetchChatDetails(req.params.userId)
      .then(function(result) {
        res.status(200).json({
          status: 200,
          message: 'success',
          data: result
        })
      })
      .catch(function(err) {
        console.log(err)
      })
  })

  io.sockets.on('connection', function(socket) {
    socket.on('init', function() {
      console.log("Socket connected")
    })
  })
}
