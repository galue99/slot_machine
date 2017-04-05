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
  '$state',
  '$cordovaCamera',
  'Upload',
  '$ionicPopup',
  '$http',
  '$scope',
  '$stateParams',
  'MachineService',
  '$ionicLoading',
  '$ionicModal',
  '$cordovaBarcodeScanner',


  function($state, $cordovaCamera,Upload, $ionicPopup, $http, $scope, $stateParams, MachineService, $ionicLoading, $ionicModal, $cordovaBarcodeScanner)
  {
    var id = $stateParams.id;

    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    });

   /* MachineService.getPlacesMachineId(id)
      .then(function(response) {
        $scope.machines = response.data.result;
        $ionicLoading.hide();
        // close pull to refresh loader
        $scope.$broadcast('scroll.refreshComplete');
    });*/
    $ionicLoading.hide();

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

    $scope.image1 = null;
    $scope.image2 = null;
    $scope.captureImage = function(image_id) {
      var options = { limit: 1 };
              var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 50,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
      if (image_id == 1){
        $cordovaCamera.getPicture(options).then(function(imageData) {
          console.log(imageData)
          $scope.image1 = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          console.log(err)
        });
      }else{
        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.image2 = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          console.log(err)
        });
      }
    }


     $scope.text={};
    $scope.sendForm = function(){
      
      var blob1 = Upload.dataUrltoBlob($scope.image1, '1');
      var blob2 = Upload.dataUrltoBlob($scope.image2, '2');
      console.log(blob1)
         Upload.upload({
              url: 'http://smc.gamingpty.com/api/tracking',
              data: {
                imageOut: blob1,
                imageWin: blob2,
                'textOut': $scope.text.textOut,
                'textWin': $scope.text.textWin,
                'machineId': $scope.machine.id,
                'placeId': id,
                'token': localStorage.getItem("token")
              }
          }).then(function (resp) {
            $scope.modal.hide()
            $ionicLoading.hide();
              $state.go("app.machine_audite",{id: id});
              
          }, function (resp) {
              console.log(resp);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $ionicLoading.show({
                template: 'Loading... (' + progressPercentage + '% ) ',
                duration: 1000
              });
          });
    }



  }
];
