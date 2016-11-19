app.factory('loginFactory', function($http, $location, $cookies){
  var factory = {}
  factory.check = function(callback){
    // console.log("Current Cookies:", $cookies.get("entry"))
    if (!$cookies.get("entry")){
      $location.url('/index')
    }
    else {
      $http.post('/currentuser', {_id: $cookies.get("entry")}).then(function(beroutes){
        // console.log(beroutes.data)
        callback(beroutes.data)
      })
      if ($location.url() === '/index'){
        $location.url('/')
      }
    }
  }

  factory.logreg = function(fectrl){
    $http.post('/logreg', fectrl).then(function(beroutes){
      // console.log("Typed data:", fectrl)
      // console.log("Return data:", beroutes.data)
      if(beroutes.data.result == true ){
        $cookies.put("entry", beroutes.data._id)
        $location.url('/')
      }
    })
  }

  factory.logout = function(){
    $cookies.remove("entry")
    // console.log("Removal verification (Only undefined between lines): |", $cookies.get("Name"), "|")
    $location.url('/index')
  }
  return factory
})
