app.controller('qaController', function($scope, qaFactory, $cookies, $location, $routeParams){
  //Home redirect
  $scope.home = function(){
    $location.url('/')
  }

  //Pull info
  $scope.allqs = []
  qaFactory.everything(function(data){
    $scope.allqs = data.x
  })
  if($routeParams._id){
    qaFactory.justone($routeParams, function(data){
      $scope.oneq = data
    })
  }

  //New Question
  $scope.newquestion = function(){
    // console.log({findId:$cookies.get("entry"), data: $scope.newq})
    qaFactory.newquestion({findId:$cookies.get("entry"), data:$scope.newq})
  }
  //New Answer
  $scope.newanswer = function(){
    // console.log({findId:$cookies.get("entry"), _id: $routeParams._id, data: $scope.newa})
    qaFactory.newanswer({findId:$cookies.get("entry"), _id: $routeParams._id, data:$scope.newa})
  }

  //Like
  $scope.like = function(param){
    qaFactory.like({_id: param})
  }
})
