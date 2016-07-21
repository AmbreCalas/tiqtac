'use strict';
/* Add FBL Controller */

routeControllers.controller('addFblCtrl', ['$scope', '$routeParams', '$location', 'PiByNumber', 'CreateFbl', function($scope, $routeParams, $location, PiByNumber, CreateFbl){
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.title = 'PI' + $scope.pi_number + ' - Add FBL';
  $scope.name= '';
  $scope.description= '';
  $scope.points = 0;
  $scope.md = 0;
  $scope.risk = 0;
  $scope.estimateMd = 0;
  $scope.probability = 100;
  $scope.coeff1 = 0;
  $scope.coeff2 = 0;
  $scope.roundedMd = 0;
  $scope.roundedEstimateMd = 0;

  // Get pi information
  PiByNumber($scope.pi_number).then(function(res) {
    $scope.actualPi = res.data;
    $scope.coeff1 = $scope.actualPi.coeff1;
    $scope.coeff2 = $scope.actualPi.coeff2;
  });

  // Update 'md' according to 'points'
  $scope.$watch('points', function() {
    $scope.md = $scope.points * $scope.coeff1;
    $scope.estimateMd = $scope.points * $scope.coeff1 * $scope.coeff2;
  });
  // Update 'estimateMd' according to 'md'
  $scope.$watch('md', function() {
    $scope.estimateMd = $scope.md * $scope.coeff2;
  });

  // Handle probability
  $scope.possibleProbas = [20,50,100];
  $scope.proba = $scope.probability;
  $scope.$watch('proba', function() {
    $scope.probability = parseInt($scope.proba);
  });
  
  var redirectPath = '/pi/' + $scope.pi_number + '/fbl/all';
  // Validate fbl creation
  $scope.submit = function() {
    CreateFbl($scope.pi_number, $scope.name, $scope.description, $scope.points, Math.round($scope.md), $scope.risk, Math.round($scope.estimateMd), $scope.probability/100).then(function() {
      $location.path(redirectPath);
    });
  };
}]);
