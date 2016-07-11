'use strict';
/* FBL list controller */

routeControllers.controller('fblListCtrl', ['$scope', '$routeParams', '$uibModal', 'FblAll', 'TotalCalculator', function($scope, $routeParams, $uibModal, FblAll, TotalCalculator) {
  $scope.pi_number = $routeParams.pi;
  $scope.pi = 'PI' + $scope.pi_number;
  $scope.title = $scope.pi + ' - FBL list';
  $scope.addFblMessage ='Create FBL';
  FblAll($scope.pi_number).then(function(res) {
    $scope.fbls = res.data;
    var fbl_totals = TotalCalculator($scope.fbls);
    $scope.total = fbl_totals.totals;
    $scope.fbls.push($scope.total);
    $scope.balancedTotal = fbl_totals.balances;
    $scope.fbls.push($scope.balancedTotal);
  });
  // Delete Fbl Modal
  $scope.animationsEnabled = true;
  $scope.open = function(size, fblId) {
    $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '/partials/delete-fbl.html',
      controller: 'deleteFblCtrl',
      size: size,
      resolve: {
        fbl_id: function(){return fblId;},
        pi_number: function(){return $scope.pi_number;}
      }
    });
  };
  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
}]);
