/**
 * Created by edgar on 12/11/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name SlotMachineControl.controller:PlaceDetailsController
 * @description
 * # PlaceDetailsController
 */
module.exports = [
  '$scope',
  '$stateParams',
  'MachineService',
  '$ionicModal',
  '$ionicLoading',

  function($scope, $stateParams, MachineService, $ionicModal, $ionicLoading)
  {

    var id = $stateParams.id;
    $scope.place = {};

    $scope.id = id;

    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    });


    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.createContact = function(u) {
      $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
      $scope.modal.hide();
    };


    $scope.detailPlace = function(){
      MachineService.getPlacesId(id)
      .then(function(response) {
        $scope.place = response.data.result;
        $ionicLoading.hide();
        // close pull to refresh loader
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.detailPlace();

    $scope.map = { center: { latitude: $stateParams.latitude, longitude: $stateParams.longitude }, zoom: 12 };
    $scope.marker = {
      id: 0,
      coords: {
        latitude: $stateParams.latitude,
        longitude: $stateParams.longitude
      }
    };
  }
];
