'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:HomeController
 * @description
 * # HomeController
 */
module.exports = [
  '$scope',
  'MachineService',
  '$ionicLoading',



  function( $scope, MachineService, $ionicLoading )
  {
    $scope.places = {};


    $ionicLoading.show({
        template: 'Loading...',
        duration: 3000
    });


    console.log(JSON.parse(localStorage.getItem("data")));


    $scope.updatePlaces = function(){
      MachineService.doSomethingAsync()
        .then(MachineService.getPlaces)
        .then(function(response) {
          $scope.places = response.data.result;

          $ionicLoading.hide();
          //console.log(response.data.result);
          // close pull to refresh loader
          $scope.$broadcast('scroll.refreshComplete');
        });

    };


    $scope.updatePlaces();



  }
];
