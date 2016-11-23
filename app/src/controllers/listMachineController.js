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
  '$ionicModal',
  '$cordovaBarcodeScanner',
  '$cordovaCapture',


  function($scope, $stateParams, MachineService, $ionicLoading, $ionicModal, $cordovaBarcodeScanner, $cordovaCapture)
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

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.captureQr = function(){   
      $cordovaBarcodeScanner
        .scan()
        .then(function(barcodeData) {
          console.log(barcodeData)
          $scope.modal.show()
        }, function(error) {
          // An error occurred
        });
    }

    $scope.captureImage = function() {
      var options = { limit: 3 };

      $cordovaCapture.captureImage(options).then(function(imageData) {
         alert("Imagen Capturada.")
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }



  }
];
