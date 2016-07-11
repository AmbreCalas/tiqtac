'use strict';
/* Add FBL Controller */

routeControllers.controller('addFblCtrl', ['$scope', '$routeParams', '$location', 'PiByNumber', 'CreateFbl', function($scope, $routeParams, $location, PiByNumber, CreateFbl){
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
  PiByNumber($scope.pi_number).then(function(res) {
    $scope.actualPi = res.data;
    $scope.coeff1 = $scope.actualPi.coeff1;
    $scope.coeff2 = $scope.actualPi.coeff2;
  });
  // Update 'md' according to 'points'
  $scope.$watch('points', function() {
    $scope.md = Math.round($scope.points * $scope.coeff1);
  });
  // Update 'estimateMd' according to 'md'
  $scope.$watch('md', function() {
    $scope.estimateMd = Math.round($scope.md * $scope.coeff2);
  });
  // Handle probability
  $scope.possibleProbas = [20,50,100];
  $scope.proba = '';
  $scope.$watch('proba', function() {
    $scope.probability = parseInt($scope.proba);
  });
  var redirectPath = '/pi/' + $scope.pi_number + '/fbl/all';
  // Validate fbl creation
  $scope.submit = function() {
    CreateFbl($scope.pi_number, $scope.name, $scope.description, $scope.points, $scope.md, $scope.risk, $scope.estimateMd, $scope.probability/100).then(function() {
      $location.path(redirectPath);
    });
  };
}]);
