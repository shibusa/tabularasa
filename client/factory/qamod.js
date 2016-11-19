app.factory('qaFactory', function($http, $location, $cookies, $route){
  var factory = {}
  factory.everything = function(callback){
    $http.get('/everything').then(function(beroutes){
      callback(beroutes.data)
    })
  }
  factory.justone = function(fectrl, callback){
    $http.post('/justone', fectrl).then(function(beroutes){
      // console.log(beroutes.data)
      callback(beroutes.data)
    })
  }
  factory.newquestion = function(fectrl){
    $http.post('/newquestion', fectrl).then(function(beroutes){
      // console.log(beroutes.data.x)
      if(beroutes.data.x == "Success"){
        $location.url('/')
      }
    })
  }
  factory.newanswer = function(fectrl){
    $http.post('/newanswer', fectrl).then(function(beroutes){
      // console.log(beroutes.data.x)
      if(beroutes.data.x == "Success"){
        $location.url("/question/" + fectrl._id)
      }
    })
  }
  factory.like = function(fectrl){
    $http.post('/like', fectrl).then(function(beroutes){
      if(beroutes.data.x == "Success"){
        $route.reload()
      }
    })
  }
  return factory
})
