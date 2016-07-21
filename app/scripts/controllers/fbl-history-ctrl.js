'use strict';
/* FBL history controller */

routeControllers.controller('fblHistoryCtrl', ['$scope', '$routeParams', 'FblById', 'FblHistory', function($scope, $routeParams, FblById, FblHistory) {
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.pi = 'PI' + $scope.pi_number;
  $scope.fbl_id = $routeParams.fbl;
  // Order by descendant date
  $scope.descendant = false;
  // Criterion initialisation
  $scope.selectedOption = 'all';
  // Filter by criterion
  $scope.optionFilter = function(element) {
    if($scope.selectedOption === 'pi') {
      return element.type === 'UPI';
    }
    else if($scope.selectedOption === 'name') {
      return element.type === 'UTD';
    }
    else if($scope.selectedOption === 'proba') {
      return element.type === 'UPR';
    }
    else if($scope.selectedOption === 'coeffs') {
      return element.type === 'UCO';
    }
    else if($scope.selectedOption === 'values') {
      return element.type === 'UVA';
    }
    else {
      return true;
    }
  };

  // Get fbl information
  FblById($scope.fbl_id).then(function(res) {
    $scope.fbl = res.data;
    $scope.title = 'FBL History : ' + $scope.fbl.fbl_name;
  });

  // Get history
  FblHistory($scope.fbl_id).then(function(res) {
    $scope.histories = res.data;
  });
}]);
