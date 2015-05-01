/**
 * Created by rramachandra on 2015-04-30.
 */

var myApp = angular.module('myNgApp', []);

myApp.run(function(){
   console.log("Now loading ");
});

myApp.controller('myNgAppCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.name = "Bhooshpoopi";
    $http.get('/profile').
        success(function(data, status, headers, config) {
            console.log("Success: " + data);
            $scope.name = data.name;
        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });

}]);

