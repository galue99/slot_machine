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

    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    });

    MachineService.getMachineId(id)
      .then(function(response) {
        $scope.machine = response.data.result;
        console.log(response);
        console.log(response.data.result);
      //  $ionicLoading.hide();
        // close pull to refresh loader
        $scope.$broadcast('scroll.refreshComplete');
      });



  }
];
