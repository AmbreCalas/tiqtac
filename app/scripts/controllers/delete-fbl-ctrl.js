'use strict';
/* Delete fbl controller */

app.controller('deleteFblCtrl', ['$scope', '$route', '$uibModalInstance', 'fbl_id', 'pi_number', 'DeleteFbl', function($scope, $route, $uibModalInstance, fbl_id, pi_number, DeleteFbl) {
  $scope.selected = fbl_id;
  $scope.pi = pi_number;
  $scope.deleteFbl = function () {
    DeleteFbl(fbl_id).then(function() {
      $uibModalInstance.close();
      $route.reload();
    });
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
