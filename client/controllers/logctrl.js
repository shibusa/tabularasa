app.controller('loginController', function($scope, loginFactory){
  $scope.currentuser = []
  loginFactory.check(function(data){
    $scope.currentuser = data
  })

  $scope.logreg = function(){
    loginFactory.logreg($scope.new)
  }

  $scope.logout = function(){
    loginFactory.logout()
  }
})
