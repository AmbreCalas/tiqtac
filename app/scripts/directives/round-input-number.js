'use strict';
// Directive that round fbl values in order to be printed

angular.module('app').directive('roundInputNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      //convert data from view format to model format
      ngModelController.$parsers.push(function(data) {
        return data; //no changes here
      });

      //convert data from model format to view format
      ngModelController.$formatters.push(function(data) {
        return Math.round(data); // rounded value
      });
    }
  }
});
