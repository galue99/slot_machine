'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:MainController
 * @description
 * # MainController
 */
module.exports = [
    '$scope',
    '$state',

    function( $scope , $state)
    {
       $scope.username = JSON.parse(localStorage.getItem("data"));

       $scope.logout = function(){
       		localStorage.removeItem("token");
       		$state.go("auth.login")
       }
    }
];
