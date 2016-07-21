'use strict';
/* Add PI Controller */

routeControllers.controller('addPiCtrl', ['$scope', '$location', 'CreatePi', 'LastPi', function($scope, $location, CreatePi, LastPi){
  // Initialisation
  $scope.title = 'Add PI';
  $scope.pi_number = 1;

  // Get last pi information
  LastPi().then(function(res) {
    $scope.lastPi = res.data;
    $scope.pi_number = $scope.lastPi.pi_number + 1;

    // Prepare PI creation
    $scope.toAdd = 'PI' + $scope.pi_number;
    $scope.coeffs = [ {
      'label' : 'Points to days',
      'coeffValue' : $scope.lastPi.coeff1
    }, {
      'label' : 'Transverse',
      'coeffValue' : $scope.lastPi.coeff2
    }];
  });

  var redirectPath = '/pi/all';
  // Validate pi creation
  $scope.submit = function() {
    CreatePi($scope.pi_number, $scope.coeffs[0].coeffValue, $scope.coeffs[1].coeffValue).then(function(res) {
      $scope.newPi = res.data;
      redirectPath = '/pi/' + $scope.newPi.pi_number + '/fbl/all';
      $location.path(redirectPath);
    });
  };
}]);
