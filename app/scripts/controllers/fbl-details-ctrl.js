'use strict';
/* FBL details controller */

routeControllers.controller('fblDetailsCtrl', ['$scope', '$routeParams', 'FblById', function($scope, $routeParams, FblById) {
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.pi = 'PI' + $scope.pi_number;
  $scope.fbl_id = $routeParams.fbl;

  // Get fbl information
  FblById($scope.fbl_id).then(function(res) {
    $scope.fbl = res.data;
    $scope.title = $scope.pi + ' - ' + $scope.fbl.fbl_name;
  });
}]);
