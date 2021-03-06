/**
 * Created by edgar on 14/11/16.
 */
'use strict';
/**
 * @ngdoc function
 * @name SlotMachineControl.service:MachineService
 * @description
 * # MachineService
 */
module.exports = [
  '$http',
  '$timeout',
  '$q',

  function( $http, $timeout, $q )
  {
    var kindOfPrivateVariable = 42;

    var doSomethingAsync = function() {
      var deferred = $q.defer();
      $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
      return deferred.promise;
    };

    var getPlaces = function() {
      return $http({
        url: 'http://smc.gamingpty.com/api/places?token=' + localStorage.getItem("token"),
        method: 'GET',
      })
        .success(function(data) {
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    var getPlacesId = function(id) {
      return $http({
        url: 'http://smc.gamingpty.com/api/places/' + id + '?token=' + localStorage.getItem("token"),
        method: 'GET'
      })
        .success(function(data) {
          //console.log(data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    var getPlacesMachineId = function(id) {
      return $http({
        url: 'http://smc.gamingpty.com/api/places/'+id+'/machines?token=' + localStorage.getItem("token"),
        method: 'GET'
      })
        .success(function(data) {
          //console.log(data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    var getMachineId = function(id) {
      return $http({
        url: 'http://smc.gamingpty.com/api/machines/' + id + '?token=' + localStorage.getItem("token"),
        method: 'GET'
      })
        .success(function(data) {
          //console.log(data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    var getPlacesEstablishmentsAudite = function(id) {
      return $http({
        url: 'http://smc.gamingpty.com/api/tracking/' + id + '?token=' + localStorage.getItem("token"),
        method: 'GET'
      })
        .success(function(data) {
          //console.log(data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    var getPlacesMachineAudite = function(id) {

      var user = JSON.parse(localStorage.getItem("data"))

      return $http({
        url: 'http://smc.gamingpty.com/api/trackingmachine/' + user.user_id + '/' + id + '?token=' + localStorage.getItem("token"),
        method: 'GET'
      })
        .success(function(data) {
          //console.log(data);
        })
        .error(function(error) {
          console.log('an error occured', error);
        });
    };

    // public api
    return {
      doSomethingAsync:doSomethingAsync,
      getPlaces:getPlaces,
      getPlacesId:getPlacesId,
      getPlacesMachineId:getPlacesMachineId,
      getMachineId:getMachineId,
      getPlacesEstablishmentsAudite:getPlacesEstablishmentsAudite,
      getPlacesMachineAudite:getPlacesMachineAudite
    };
  }
];
