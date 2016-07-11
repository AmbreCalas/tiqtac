'use strict';

var server = 'http://localhost:8080/';

app.factory('PiAll', ['$http', '$q', function($http, $q){
  var serverPiAll = server + 'pi/all';
  var deferred = $q.defer();
  $http.get(serverPiAll).then(
    function(data, status, headers, config) { deferred.resolve(data);},
    function(data, status, headers, config) { deferred.reject(data);});
  return deferred.promise;
}]);

// A CHANGER (PARAMS)
app.factory('PiByNumber', ['$http', '$q', function($http, $q){
  return function(piNumber) {
    var serverPiByNum = server + 'pi/' + piNumber;
    var deferred = $q.defer();
    $http.get(serverPiByNum).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// A CHANGER (PARAMS)
app.factory('CreatePi', ['$http', '$q', function($http, $q){
  return function(pi_number, coeff1, coeff2) {
    var serverPi = server + 'pi/add/' + pi_number + '/' + coeff1 + '/' + coeff2;
    var deferred = $q.defer();
    $http.post(serverPi).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);


// A CHANGER (PARAMS)
app.factory('CreateFbl', ['$http', '$q', function($http, $q){
  return function(pi_number, name, description, points, md, risk, estimateMd, proba) {
    var serverFbl = server + 'pi/' + pi_number + '/fbl/add/' + name + '/' + description + '/' + points + '/' + md + '/' + risk + '/' + estimateMd + '/' + proba;
    var deferred = $q.defer();
    $http.post(serverFbl).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// A CHANGER (PARAMS)
app.factory('FblAll', ['$http', '$q', function($http, $q){
  return function(piNumber) {
    var serverFblAll = server + 'pi/' + piNumber + '/fbl/all';
    var deferred = $q.defer();
    $http.get(serverFblAll).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

app.factory('LastPi', ['$http', '$q', function($http, $q){
  var serverPiLast = server + 'pi/last';
  var deferred = $q.defer();
  $http.get(serverPiLast).then(
    function(data, status, headers, config) { deferred.resolve(data);},
    function(data, status, headers, config) { deferred.reject(data);});
  return deferred.promise;
}]);

// A CHANGER (PARAMS)
app.factory('FblById', ['$http', '$q', function($http, $q){
  return function(fblId) {
    var serverFblId = server + 'fbl/' + fblId;
    var deferred = $q.defer();
    $http.get(serverFblId).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// A CHANGER (PARAMS)
app.factory('ChangePi', ['$http', '$q', function($http, $q){
  return function(fblId, piNumber) {
    var serverChangePi = server + 'fbl/' + fblId + '/' + piNumber;
    var deferred = $q.defer();
    $http.put(serverChangePi).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// A CHANGER (PARAMS)
app.factory('DeleteFbl', ['$http', '$q', function($http, $q){
  return function(fblId) {
    var serverDeleteFbl = server + 'fbl/' + fblId + '/del';
    var deferred = $q.defer();
    $http.delete(serverDeleteFbl).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);
