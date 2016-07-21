'use strict';
/* Delete fbl controller */

app.controller('deleteFblCtrl', ['$scope', '$route', '$uibModalInstance', 'fbl_id', 'pi_number', 'DeleteFbl', function($scope, $route, $uibModalInstance, fbl_id, pi_number, DeleteFbl) {
  // Initialisation
  $scope.selected = fbl_id;
  $scope.pi = pi_number;
  $scope.comment = '';

  // Validate deletion
  $scope.deleteFbl = function () {
    DeleteFbl(fbl_id, $scope.comment).then(function() {
      $uibModalInstance.close();
      $route.reload();
    });
  };
  
  // Cancel deletion and close modal
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
