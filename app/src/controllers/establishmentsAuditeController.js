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
  'MachineService',
  '$ionicLoading',



  function($scope, MachineService, $ionicLoading)
  {

    var data = JSON.parse(localStorage.getItem("data"));

    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    });


    $scope.refresh = function(){
      MachineService.getPlacesEstablishmentsAudite(data.user_id)
          .then(function(response) {
              $scope.data = response.data.result;
              $ionicLoading.hide();
              // close pull to refresh loader
              $scope.$broadcast('scroll.refreshComplete');
          });

    };

    $scope.refresh();


  }
];
