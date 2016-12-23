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
  '$ionicPopup',
  '$http',
  '$scope',
  '$stateParams',
  'MachineService',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaBarcodeScanner',
  '$cordovaCapture',


  function($ionicPopup, $http, $scope, $stateParams, MachineService, $ionicLoading, $ionicModal, $cordovaBarcodeScanner, $cordovaCapture)
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
          console.log(barcodeData);
          try{
            var obj=eval("("+barcodeData.text+")");
            console.log(obj)

            $http({
                        method: 'GET',
                        url: 'http://smc.gamingpty.com/api/machines/'+obj.id+'?token='+localStorage.getItem("token")+''
                      }).then(function successCallback(response) {
                          console.log(response.data)
                          $scope.machine = response.data.result[0];
                          $scope.modal.show()
                        }, function errorCallback(response) {
                          // called asynchronously if an error occurs
                          // or server returns response with an error status.
                        });
          }
          catch(err){
            $ionicPopup.alert({title: 'Error!!',template: 'La maquina analizada es incorrecta, intente de nuevo'});
          }

        }, function(error) {
          $ionicPopup.alert({title: 'Error!!',template: 'La maquina analizada es incorrecta, intente de nuevo'});
        });
    }

    $scope.captureImage = function() {
      var options = { limit: 1 };

      $cordovaCapture.captureImage(options).then(function(imageData) {
         alert("Imagen Capturada.")
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }



  }
];
