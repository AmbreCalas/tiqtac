'use strict';
/* FBL list controller */

routeControllers.controller('fblMoveCtrl', ['$scope', '$routeParams', '$location', 'FblById', 'PiAll', 'ChangePi', function($scope, $routeParams, $location, FblById, PiAll, ChangePi) {
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.actualPi = 'Actual PI : PI' + $scope.pi_number;
  $scope.fbl_id = $routeParams.fbl;
  $scope.selectedPi = null;
  $scope.comment = '';

  // Get fbl information
  FblById($scope.fbl_id).then(function(res) {
    $scope.title = 'Move FBL : “' + res.data.fbl_name + '”';
  });

  // Remove actual pi of pi list
  var differentThanActual = function(obj) {
    return (parseInt($scope.pi_number, 10) !== parseInt(obj.pi_number, 10));
  };

  // Get all Pi then call 'differentThanActual' function
  PiAll().then(function(res) {
    $scope.nonActualPis = res.data.filter(differentThanActual);
  });

  // Validate change
  $scope.submit = function() {
    ChangePi($scope.fbl_id, $scope.pi_number, $scope.selectedPi, $scope.comment).then(function() {
      var redirectPath = '/pi/' + $scope.selectedPi + '/fbl/all';
      $location.path(redirectPath);
    });
  };
}]);
