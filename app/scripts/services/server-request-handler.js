'use strict';

// Send requests to server

var server = 'http://localhost:8080/';

/* *************** GET *************** */
// All Pi
app.factory('PiAll', ['$http', '$q', function($http, $q){
  return function() {
    var serverPiAll = server + 'pi/all';
    var deferred = $q.defer();
    $http.get(serverPiAll).then(
      function(data, status, headers, config) { deferred.resolve(data);},
      function(data, status, headers, config) { deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Pi by number
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

// Current revision for a pi
app.factory('CurrentRevision', ['$http', '$q', function($http, $q){
  return function(piNumber) {
    var serverPiByNum = server + 'pi/' + piNumber + '/currentRevision';
    var deferred = $q.defer();
    $http.get(serverPiByNum).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// All fbl for a pi
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

// Last pi
app.factory('LastPi', ['$http', '$q', function($http, $q){
  return function() {
    var serverPiLast = server + 'pi/last';
    var deferred = $q.defer();
    $http.get(serverPiLast).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Fbl by id
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

// History for a fbl
app.factory('FblHistory', ['$http', '$q', function($http, $q){
  return function(fblId) {
    var serverFblHistory = server + 'fbl/' + fblId + '/history';
    var deferred = $q.defer();
    $http.get(serverFblHistory).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// History for a pi
app.factory('PiHistory', ['$http', '$q', function($http, $q){
  return function(piNumber) {
    var serverPiHistory = server + 'pi/' + piNumber + '/history';
    var deferred = $q.defer();
    $http.get(serverPiHistory).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);



/* *************** POST *************** */
// Create pi
app.factory('CreatePi', ['$http', '$q', function($http, $q){
  return function(pi_number, coeff1, coeff2) {
    var serverPi = server + 'pi/add';
    var deferred = $q.defer();
    $http({
      url: serverPi,
      method: 'POST',
      params: {'piNumber': pi_number, 'firstCoeff': coeff1, 'secondCoeff': coeff2}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Create fbl
app.factory('CreateFbl', ['$http', '$q', function($http, $q){
  return function(pi_number, name, description, points, md, risk, estimateMd, proba) {
    var serverFblAdd = server + 'pi/' + pi_number + '/fbl/add';
    var deferred = $q.defer();
    $http({
      url: serverFblAdd,
      method: 'POST',
      params: {'name': name, 'description': description, 'points': points, 'md': md, 'risk': risk, 'estimateMd': estimateMd, 'probability': proba}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Create a revision
app.factory('CreateRevision', ['$http', '$q', function($http, $q){
  return function(pi_number, comment) {
    var serverRevisionAdd = server + 'pi/' + pi_number + '/revision/add';
    var deferred = $q.defer();
    $http({
      url: serverRevisionAdd,
      method: 'POST',
      params: {'comment': comment}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);



/* *************** PUT *************** */
// Modify fbl's pi
app.factory('ChangePi', ['$http', '$q', function($http, $q){
  return function(fblId, actualPiNumber, newPiNumber, comment) {
    var serverChangePi = server + 'pi/' + actualPiNumber + '/fbl/' + fblId + '/move';
    var deferred = $q.defer();
    $http({
      url: serverChangePi,
      method: 'PUT',
      params: {'newPiNumber': newPiNumber, 'comment': comment}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Modify a pi's coeffs
app.factory('ModifyCoeffs', ['$http', '$q', function($http, $q){
  return function(piNumber, oldCoeff1, oldCoeff2, newCoeff1, newCoeff2, comment) {
    var serverModifyCoeffs = server + 'pi/' + piNumber + '/modify';
    var deferred = $q.defer();
    $http({
      url: serverModifyCoeffs,
      method: 'PUT',
      params: {'oldCoeff1': oldCoeff1, 'oldCoeff2': oldCoeff2, 'newCoeff1': newCoeff1, 'newCoeff2': newCoeff2, 'comment': comment}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Adjust fbl with pi coeffs
app.factory('AdjustFbls', ['$http', '$q', function($http, $q){
  return function(piNumber, newCoeff1, newCoeff2, oldCoeff1, oldCoeff2, comment) {
    var serverAdjustFbls = server + 'pi/' + piNumber + '/adjustFbls';
    var deferred = $q.defer();
    $http({
      url: serverAdjustFbls,
      method: 'PUT',
      params: {'newCoeff1': newCoeff1, 'newCoeff2': newCoeff2, 'oldCoeff1': oldCoeff1, 'oldCoeff2': oldCoeff2, 'comment': comment}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Modify fbl's values
app.factory('ModifyFblValues', ['$http', '$q', function($http, $q){
  return function(piNumber, fblId, oldPoints, oldMd, oldRisk, oldEstimateMd, newPoints, newMd, newRisk, newEstimateMd, comment) {
    var serverModifyFbl = server + 'pi/' + piNumber + '/fbl/' + fblId + '/modifyValues';
    var deferred = $q.defer();
    $http({
      url: serverModifyFbl,
      method: 'PUT',
      params: {'oldPoints' : oldPoints, 'oldMd': oldMd, 'oldRisk': oldRisk, 'oldEstimateMd': oldEstimateMd, 'newPoints': newPoints, 'newMd': newMd, 'newRisk': newRisk, 'newEstimateMd': newEstimateMd, 'comment': comment}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Modify fbl's params
app.factory('ModifyFblParams', ['$http', '$q', function($http, $q){
  return function(piNumber, fblId, fblName, description, probability, oldName, oldDescription, oldProba) {
    var serverModifyFbl = server + 'pi/' + piNumber + '/fbl/' + fblId + '/modifyParams';
    var deferred = $q.defer();
    $http({
      url: serverModifyFbl,
      method: 'PUT',
      params: {'fblName' : fblName, 'description': description, 'probability': probability, 'oldName': oldName, 'oldDescription': oldDescription, 'oldProba': oldProba}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);

// Modify fbl's
app.factory('ModifyFblCoeffs', ['$http', '$q', function($http, $q){
  return function(piNumber, fblId, newCoeff1, newCoeff2, oldCoeff1, oldCoeff2) {
    var serverModifyFbl = server + 'pi/' + piNumber + '/fbl/' + fblId + '/setValues';
    var deferred = $q.defer();
    $http({
      url: serverModifyFbl,
      method: 'PUT',
      params: {'newCoeff1' : newCoeff1, 'newCoeff2': newCoeff2, 'oldCoeff1': oldCoeff1, 'oldCoeff2' : oldCoeff2}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);



/* *************** DELETE *************** */
// Delete fbl
app.factory('DeleteFbl', ['$http', '$q', function($http, $q){
  return function(fblId, comment) {
    var serverDeleteFbl = server + 'fbl/' + fblId + '/del';
    var deferred = $q.defer();
    $http({
      url: serverDeleteFbl,
      method: 'DELETE',
      params: {'comment': comment}
    }).then(
      function (data, status, headers, config) {deferred.resolve(data);},
      function (data, status, headers, config) {deferred.reject(data);});
    return deferred.promise;
  };
}]);
