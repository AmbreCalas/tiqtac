'use strict';
/* FBL list controller */

routeControllers.controller('fblListCtrl', ['$scope', '$routeParams', '$uibModal', '$timeout', '$filter', 'FblAll', 'TotalCalculator', 'ReturnChangedFbl', function($scope, $routeParams, $uibModal, $timeout, $filter, FblAll, TotalCalculator, ReturnChangedFbl) {
  // Initialisation
  $scope.pi_number = $routeParams.pi;
  $scope.pi = 'PI' + $scope.pi_number;
  $scope.title = $scope.pi + ' - FBL list';
  $scope.addFblMessage ='Create FBL';

  // Get fbls list for current pi
  FblAll($scope.pi_number).then(function(res) {
    $scope.fbls = res.data;
    // Filter it to be in the same order as it will be displayed
    $scope.fbls = $filter('orderBy')($scope.fbls, ['-probability', 'fbl_id']);

    // fblsCopy : working version, can be canceled
    $scope.fblsCopy = angular.copy($scope.fbls);
    setTotals($scope.fblsCopy);

    // Permit to set default values without watcher's action begins
    var initializing = true;

    // Watch and update fblsCopy values
    for(var i = 0; i < $scope.fblsCopy.length; i++) {
      if($scope.fblsCopy[i].probability !== 0) {
        // Watch "risks" and update totals
        (function(e) {
          $scope.$watch('fblsCopy[' + e + '].risk', function () {
            if (initializing) {
              $timeout(function() { initializing = false; });
            } else {
              recalculateTotals();
            }
          });
        })(i);
        // Watch "estimate_md" and update totals
        (function(e) {
          $scope.$watch('fblsCopy[' + e + '].estimate_md', function () {
            if (initializing) {
              $timeout(function() { initializing = false; });
            } else {
              //updatePointsMd(e);
              recalculateTotals();
            }
          });
        })(i);
        // Watch "md" and update "estimate_md" and totals
        (function(e) {
          $scope.$watch('fblsCopy[' + e + '].md', function () {
            if (initializing) {
              $timeout(function() { initializing = false; });
            } else {
              updatePointsEstimate(e);
              recalculateTotals();
            }
          });
        })(i);
        // Watch "points" and update "md", "estimate_md" ans totals
        (function(e) {
          $scope.$watch('fblsCopy[' + e + '].points', function () {
            if (initializing) {
              $timeout(function() { initializing = false; });
            } else {
              updateMdEstimate(e);
              recalculateTotals();
            }
          });
        })(i);
      }
    }

    // Update total and balanced total values
    var recalculateTotals = function() {
      var fbl_totals = TotalCalculator($scope.fblsCopy);
      $scope.fblsCopy[$scope.fblsCopy.length-2] = fbl_totals.totals;
      $scope.fblsCopy[$scope.fblsCopy.length-1] = fbl_totals.balances;
    };
    // Update functions
    var updateMdEstimate = function(e) {
        $scope.fblsCopy[e].md = $scope.fblsCopy[e].points * $scope.fblsCopy[e].coeff1;
        $scope.fblsCopy[e].estimate_md = $scope.fblsCopy[e].points * $scope.fblsCopy[e].coeff1 * $scope.fblsCopy[e].coeff2;
    };
    var updatePointsEstimate = function(e) {
      $scope.fblsCopy[e].estimate_md = $scope.fblsCopy[e].md * $scope.fblsCopy[e].coeff2;
    };
    var updatePointsMd = function(e) {
      $scope.fblsCopy[e].md = $scope.fblsCopy[e].estimate_md / $scope.fblsCopy[e].coeff2;
      $scope.fblsCopy[e].points = $scope.fblsCopy[e].md / ($scope.fblsCopy[e].coeff1 * $scope.fblsCopy[e].coeff2);
    };



    // Save fbl changes Modal (sfc = save fbl changes)
    $scope.sfcAnimationsEnabled = true;
    $scope.sfcOpen = function(size) {
      $uibModal.open({
        animation: $scope.sfcAnimationsEnabled,
        templateUrl: '/partials/save-fbl-changes.html',
        controller: 'saveFblChangesCtrl',
        size: size,
        resolve: {
          differences: function(){return ReturnChangedFbl($scope.fbls, $scope.fblsCopy);},
          pi_number: function(){return $scope.pi_number;}
        }
      });
    };
    $scope.sfcToggleAnimation = function () {
      $scope.sfcAnimationsEnabled = !$scope.sfcAnimationsEnabled;
    };

  });

  // Calculate totals
  var setTotals = function(fblsCopy) {
    var fbl_totals = TotalCalculator(fblsCopy);
    $scope.total = fbl_totals.totals;
    $scope.fblsCopy.push($scope.total);
    $scope.balancedTotal = fbl_totals.balances;
    $scope.fblsCopy.push($scope.balancedTotal);
  };

  // Erase changes
  $scope.cancelChanges = function() {
    $scope.fblsCopy = angular.copy($scope.fbls);
    setTotals($scope.fblsCopy);
  };

  // Delete Fbl Modal
  $scope.dfAnimationsEnabled = true;
  $scope.dfOpen = function(fblId) {
    $uibModal.open({
      animation: $scope.dfAnimationsEnabled,
      templateUrl: '/partials/delete-fbl.html',
      controller: 'deleteFblCtrl',
      resolve: {
        fbl_id: function(){return fblId;},
        pi_number: function(){return $scope.pi_number;}
      }
    });
  };
  $scope.toggleAnimation = function () {
    $scope.dfAnimationsEnabled = !$scope.dfAnimationsEnabled;
  };

  // Round value to display
  $scope.roundValue = function(value) {
    return Math.round(value);
  };

}]);
