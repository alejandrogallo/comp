
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
      $scope.FRIENDS_DATA[friendName] = {};
      $scope.FRIENDS_DATA[friendName].data = [];
      $scope.DATA.forEach(function(element, index){
        if (element.name == friendName) {
          $scope.FRIENDS_DATA[friendName].data.push(element);
        }
      });
      var points = $scope.getPoints(friendName);
      var category = $scope.getCategory(points);
      $scope.FRIENDS_DATA[friendName].points = points;
      $scope.FRIENDS_DATA[friendName].category = category;
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

  $scope.getCategory  = function (points) {
    /*
     *      100p= AmiGGGOS
     *      90P= AmiGGos
     *      80P= Amigo
     *      70= AmiJo
     *      60= AmiJJo
     *      50P= AmiJJJO
     *
     *      ???Frontera zona oscura ??-
     *      40P= AmiJJJo Trol
     *      30P= Amigo Interesado
     *      20P= Presunto Amigo
     *      10P= Eres un Ivan
     *      0P= Me dañas
     */
    if (points > 100)
      return "AmiGGOS";
    else if (100>=points && points >90)
      return "AmiGGos";
    else if (90>=points && points >80)
      return "Amigo";
    else if (80>=points && points >70)
      return "AmiJo";
    else if (70>=points && points >60)
      return "AmiJJo";
    else if (60>=points && points >50)
      return "AmiJJJO";
    else if (50>=points && points >40)
      return "AmiJJJo Trol";
    else if (40>=points && points >30)
      return "Amigo Interesado";
    else if (30>=points && points >20)
      return "presunto Amigo";
    else if (20>=points && points >10)
      return "Ivan";
    else if (10>=points && points >0)
      return "Me dañas";
    else
      return "Retard";
  }

  $scope.getPoints = function (friendName) {
    $scope.fetchData(); //Fetch data por si las moscas
    var points = 0;
    $scope.FRIENDS_DATA[friendName].data.forEach(function(element, index){
      points+=element.points;
    });
    return points;
  }

  $scope.fetchData();

}]);


