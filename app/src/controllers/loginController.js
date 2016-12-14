'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$scope',
    '$http',
    '$httpParamSerializerJQLike',
    '$state',

    function($scope,$http, $httpParamSerializerJQLike,$state)
    {
        $scope.user = {}
        if(localStorage.getItem("token") != null && localStorage.getItem("token") != ""){
            $state.go("app.home");
        }

        $scope.login = function(){
         	if ($scope.user.username != "" && $scope.user.password != ""){
                var req = {
                 method: 'POST',
                 url: 'http://smc.gamingpty.com/api/login',
                 headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
                 },
                 data: $httpParamSerializerJQLike({"user": $scope.user.username, "pass": $scope.user.password})
                }

                $http(req).then(function(response){
                    localStorage.setItem("token", response.data.token);
                    $state.go("app.home");
                }, function(){

                });
       	  }
        }
    }
];
