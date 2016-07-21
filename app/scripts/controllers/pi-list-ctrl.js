'use strict';

/* PI list controller */

routeControllers.controller('piListCtrl', ['$scope', 'PiAll', function($scope, PiAll){
  // Initialisation
  $scope.title = 'PI list';
  $scope.addPiMessage ='Add PI';

  // Get pis
  PiAll().then(function(res) {
    $scope.pis = res.data;
  });
}]);
