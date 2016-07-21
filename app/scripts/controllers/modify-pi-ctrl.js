'use strict';
/* Modify PI controller */

routeControllers.controller('modifyPiCtrl', ['$scope', '$routeParams', '$location', 'PiByNumber', 'ModifyCoeffs', 'AdjustFbls', function($scope, $routeParams, $location, PiByNumber, ModifyCoeffs, AdjustFbls) {
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.title = 'Modify PI : PI' + $scope.pi_number;

  // Get Pi information and set actual coefficients
  PiByNumber($scope.pi_number).then(function(res) {
    $scope.actualPi = res.data;
    $scope.coeffs = [ {
      'label' : 'Points to days',
      'coeffValue' : $scope.actualPi.coeff1
    }, {
      'label' : 'Transverse',
      'coeffValue' : $scope.actualPi.coeff2
    }];
  });

  // "Apply to existing fbl" checkbox
  $scope.checkbox = false;

  var redirectPath = '/pi/all';
  // Validate pi modification
  $scope.submit = function() {
    ModifyCoeffs($scope.pi_number, $scope.coeffs[0].coeffValue, $scope.coeffs[1].coeffValue).then(function() {
      // Modify fbls' coefficients and values if necessary
      if($scope.checkbox) {
        AdjustFbls($scope.pi_number, $scope.coeffs[0].coeffValue, $scope.coeffs[1].coeffValue).then(function() {
          $location.path(redirectPath);
        });
      } else {
        $location.path(redirectPath);
      }
    });
  };
}]);
