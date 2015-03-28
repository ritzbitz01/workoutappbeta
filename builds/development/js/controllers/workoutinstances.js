myApp.controller('WorkoutInstancesController', function($scope, 
  $rootScope, $firebase, $routeParams, 
  $location, Authentication, CountWorkouts, FIREBASE_URL) {

  $scope.whichworkout = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="name";
  $scope.direction= null;
  $scope.recordId='';
  $scope.query='';

  var ref = new Firebase(FIREBASE_URL + "/users/" +
    $scope.whichuser + "/workouts/" + 
    $scope.whichworkout + '/instances');

  var workoutInstancesList = $firebase(ref).$asArray();
  $scope.workoutinstances = workoutInstancesList;

  $scope.addInstance = function() {
    var instancesObj = $firebase(ref);

    var myData = {
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname,
      email: $scope.user.email,
      date: Firebase.ServerValue.TIMESTAMP
    };

    instancesObj.$push(myData).then(function() {
      $location.path('/instances/' + date + '/' +
        $scope.whichmeeting + '/checkinsList');
    });//checkinsObj
  }; //addCheckin


  $scope.pickRandom = function() {
    var whichRecord = Math.round(Math.random() * checkinsList.length);
    $scope.recordId = checkinsList.$keyAt(whichRecord);
  }; //pick winner

  $scope.deleteCheckin = function(id) {
    var record = $firebase(ref);
    record.$remove(id);
  }; //deleteCheckin

  $scope.showLove = function(myItem) {
    myItem.show = !myItem.show;

    if(myItem.userState == 'expanded') {
      myItem.userState = '';
    } else {
      myItem.userState = 'expanded';
    }
  }; //showLove

  $scope.giveLove = function(myItem, myGift) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/meetings/' +
      $scope.whichmeeting + '/checkins/' + myItem.$id +
      '/awards');
    var checkinsObj = $firebase(refLove);

    var myData = {
      name: myGift,
      date: Firebase.ServerValue.TIMESTAMP
    };

    checkinsObj.$push(myData);
  }; //giveLove

  $scope.deleteLove = function(checkinId, award) {
    var refLove = new Firebase(FIREBASE_URL + '/users/'+
      $scope.whichuser + '/meetings/' +
      $scope.whichmeeting + '/checkins/' + checkinId +
      '/awards');
    var record = $firebase(refLove);
    record.$remove(award);
  }; //deleteLove

}); //CheckInsController