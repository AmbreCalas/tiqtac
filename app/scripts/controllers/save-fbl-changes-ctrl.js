'use strict';
/* Save fbl changes controller */

app.controller('saveFblChangesCtrl', ['$scope', '$route', '$uibModalInstance', 'differences', 'pi_number', 'ModifyFblValues', function($scope, $route, $uibModalInstance, differences, pi_number, ModifyFblValues) {
  // Initialisation : get old and new fbls
  $scope.changed_fbls = differences.newChangedFbls;
  $scope.old_fbls = differences.oldChangedFbls;
  $scope.pi = pi_number;
  $scope.list_length = $scope.changed_fbls.length;
  // Comment for each change initialisation
  $scope.comment = [];
  for(var i = 0; i < $scope.list_length; i++) {
    $scope.comment[i] = '';
  }

  // Validate changes
  $scope.validateChanges = function () {
    for(var i = 0; i < $scope.list_length; i++) {
      ModifyFblValues(pi_number, $scope.changed_fbls[i].fbl_id, $scope.old_fbls[i].points, $scope.old_fbls[i].md, $scope.old_fbls[i].risk, $scope.old_fbls[i].estimate_md, $scope.changed_fbls[i].points, $scope.changed_fbls[i].md, $scope.changed_fbls[i].risk, $scope.changed_fbls[i].estimate_md, $scope.comment[i]).then(function() {
        $uibModalInstance.close();
        $route.reload();
      });
    }
  };

  // Cancel changes
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
