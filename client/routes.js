var app = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngCookies']);

app.config(function($routeProvider){
  $routeProvider
  .when('/index', {
    templateUrl: 'partials/login.html'
  })
  .when('/', {
    templateUrl: 'partials/dashboard.html'
  })
  .when('/new_question', {
    templateUrl: 'partials/new.html'
  })
  .when('/question/:_id', {
    templateUrl: 'partials/question.html'
  })
  .when('/new_answer/:_id', {
    templateUrl: 'partials/answer.html'
  })
  .otherwise({
    redirectTo: '/index'
  })
})
