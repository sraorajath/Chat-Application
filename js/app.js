const app = angular.module('myApp', ['ui.router'])
app.config(function($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html.ejs',
      controller: 'loginController'
    })
    .state('chat', {
      url: '/chat',
      templateUrl: '/views/chat.html.ejs',
      controller: 'chatController'
    })
  $urlRouterProvider.otherwise('/login')
})
app.controller('loginController', function($scope, $http, $location) {
  if(JSON.parse(sessionStorage.getItem('user'))) {
    $location.path('/chat')
  }
  $scope.login = function() {
    const data = {
      email: $scope.email,
    }
    $http.post('/api/login', data)
      .then(function(res) {
        if(res.data.message == 'success') {
          sessionStorage.setItem('user', JSON.stringify(res.data.data))
          $location.path('/chat')
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }
})
app.controller('chatController', function($scope, $http, $location) {
  const userId = JSON.parse(sessionStorage.getItem('user'))._id
  $http.get('/api/getChatDetails/' + userId)
    .then(function(res) {
      console.log(res)
    })
    .catch(function(err) {
      console.log(err)
    })

  const socket = io.connect()
  socket.on('connect',function() {
    console.log('connected')
    socket.emit('init')
  })
})