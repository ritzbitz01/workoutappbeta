myApp.controller('RegistrationController', 
  function($scope, $firebaseAuth, $location, Authentication, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  
  $scope.login = function() {
    Authentication.login($scope.user)
    .then(function(user) {
      $location.path('/workouts');
    }).catch(function(error) {
      $scope.message = error.message;
    });
  }; //login

  $scope.register = function() {
    Authentication.register($scope.user)
      .then(function(user) {
        Authentication.login($scope.user);
        $location.path('/workouts');
      }).catch(function(error) {
        $scope.message = error.message;
      });
  }; //register

}); //RegistrationController