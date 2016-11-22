/**
 * Created by edgar on 12/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:ListMachineController
 * @description
 * # ListMachineController
 */
module.exports = [
  '$scope',
  '$stateParams',
  'MachineService',
  '$ionicLoading',


  function($scope, $stateParams, MachineService, $ionicLoading)
  {
    var id = $stateParams.id;

    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    });

    MachineService.getPlacesMachineId(id)
      .then(function(response) {
        $scope.machines = response.data.result;
        $ionicLoading.hide();
        // close pull to refresh loader
        $scope.$broadcast('scroll.refreshComplete');
    });



  }
];
