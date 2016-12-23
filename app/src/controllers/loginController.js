'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$ionicPopup',
    '$scope',
    '$http',
    '$httpParamSerializerJQLike',
    '$state',

    function($ionicPopup, $scope,$http, $httpParamSerializerJQLike,$state)
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
                    if(!response.data.error){
                       localStorage.setItem("token", response.data.token);
                                          localStorage.setItem("data", JSON.stringify(response.data));
                                          $state.go("app.list_establishments_audite");
                    }else{
                       $scope.user = {}
                       $ionicPopup.alert({title: 'Error!!',template: 'Los datos ingresados son incorrectos, intente de nuevo.'});
                    }

                }, function(){
                    $ionicPopup.alert({title: 'Error!!',template: 'Los datos ingresados son incorrectos, intente de nuevo.'});
                });
       	  }
        }
    }
];
