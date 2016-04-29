
angular.module('comp', [])
.controller("MainController", ["$http", "$scope", "$q", function($http, $scope){

  $scope.FRIENDS_NAMES=[
    "Mario",
    "Oscar",
    "Carlos",
    "Alejandro",
    "Joan",
    "Ivan"
  ];
  $scope.DATA = undefined;
  $scope.FRIENDS_DATA = {};

  $scope.setFriendsData = function (data) {

    $scope.FRIENDS_DATA.names = $scope.FRIENDS_NAMES;

    $scope.FRIENDS_DATA.names.forEach(function(friendName){
      $scope.FRIENDS_DATA[friendName] = [];
      $scope.DATA.forEach(function(element, index){
        if (element.name == friendName) {
          $scope.FRIENDS_DATA[friendName].push(element);
        }
      });
    });
  }

  $scope.fetchData = function () {
    if (!$scope.DATA) {
      $http.get("db/db.json").then(
          function (response) {
            console.log("Data received");
            $scope.DATA = response.data;
            $scope.setFriendsData();
            console.log($scope.DATA);
          }, function (error) {
            console.log(error);
          }
          );
    }
  }


  $scope.rateFriend = function (friendName) {
    $scope.fetchData(); //Fetch data por si las moscas 
    console.log($scope.DATA);
  }

  $scope.fetchData();

}]);


