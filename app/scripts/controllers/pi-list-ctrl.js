'use strict';

/* PI list controller */

routeControllers.controller('piListCtrl', ['$scope', 'PiAll', function($scope, PiAll){
  $scope.title = 'PI list';
  $scope.addPiMessage ='Add PI';
  PiAll.then(function(res) {
    $scope.pis = res.data;
  });
}]);
