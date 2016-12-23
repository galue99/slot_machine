/**
 * Created by edgar on 12/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:DetailsMachineController
 * @description
 * # DetailsMachineController
 */
module.exports = [
  '$scope',
  '$stateParams',
  'MachineService',
  '$ionicLoading',



  function($scope, $stateParams, MachineService, $ionicLoading)
  {

    console.log($stateParams.id);
    var id = $stateParams.id;

    var data = JSON.parse(localStorage.getItem("data"))

    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    });


    $scope.refresh = function(){

            MachineService.getPlacesMachineAudite(id)
                .then(function(response) {
                    $scope.machines = response.data.result;
                    $ionicLoading.hide();
                    // close pull to refresh loader
                    $scope.$broadcast('scroll.refreshComplete');
                });

    }

    $scope.refresh();





  }
];
