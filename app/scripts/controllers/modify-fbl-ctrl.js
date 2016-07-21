'use strict';
/* Modify FBL Controller */

routeControllers.controller('modifyFblCtrl', ['$scope', '$routeParams', '$location', 'FblById', 'ModifyFblParams', 'ModifyFblCoeffs', function($scope, $routeParams, $location, FblById, ModifyFblParams, ModifyFblCoeffs){
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.pi = 'PI' + $scope.pi_number;
  $scope.fbl_id = $routeParams.fbl;

  // Get fbl information and set probability options
  FblById($scope.fbl_id).then(function(res) {
    $scope.fbl = res.data;
    $scope.title = $scope.pi + ' - ' + $scope.fbl.fbl_name;
    // Copy version to compare and see changes
    $scope.fblBeforeChanges = angular.copy($scope.fbl);
    $scope.possibleProbas = [20,50,100];
    $scope.proba = $scope.fbl.probability * 100;
    $scope.$watch('proba', function() {
      $scope.fbl.probability = parseInt($scope.proba)/100;
    });
  });

  var redirectPath = '/pi/' + $scope.pi_number + '/fbl/' + $scope.fbl_id + '/details';
  // Validate fbl modification
  $scope.submit = function() {
    var coeff1Changed = $scope.fblBeforeChanges.coeff1 !== $scope.fbl.coeff1;
    var coeff2Changed = $scope.fblBeforeChanges.coeff2 !== $scope.fbl.coeff2;
    var nameOrDescriptionChanged = $scope.fblBeforeChanges.fbl_name !== $scope.fbl.fbl_name || $scope.fblBeforeChanges.fbl_description !== $scope.fbl.fbl_description;
    var probaChanged = $scope.fblBeforeChanges.probability !== $scope.fbl.probability;

    // Check if other values changed
    if(nameOrDescriptionChanged || probaChanged) {
      // Fbl values modification and history creation
      ModifyFblParams($scope.pi_number, $scope.fbl_id, $scope.fbl.fbl_name, $scope.fbl.fbl_description, $scope.fbl.probability, $scope.fblBeforeChanges.fbl_name, $scope.fblBeforeChanges.fbl_description, $scope.fblBeforeChanges.probability).then(function() {
        $location.path(redirectPath);
      });
    }

    // Check if coefficients changed
    if(coeff1Changed || coeff2Changed) {
      // Coeff modification and history creation
      ModifyFblCoeffs($scope.pi_number, $scope.fbl_id, $scope.fbl.coeff1, $scope.fbl.coeff2, $scope.fblBeforeChanges.coeff1, $scope.fblBeforeChanges.coeff2).then(function() {
        $location.path(redirectPath);
      });
    }
  };
}]);
