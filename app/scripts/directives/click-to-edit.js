'use strict';

// Directive for dynamic edition of fbl values

// Text version
/*app.directive('clickToEditText', function($timeout) {
  return {
    require: 'ngModel',
    scope: {
      model: '=ngModel',
      type: '@type'
    },
    replace: true,
    transclude: false,
    // includes our template
    templateUrl: '/scripts/directives/templates/click-to-edit-tmp.html',

    link: function (scope, element, attrs) {
      scope.editState = false;
      // make a local ref so we can back out changes, this only happens once and persists
      scope.localModel = scope.model;

      // apply the changes to the real model
      scope.save = function(){
        scope.model = scope.localModel;
        scope.toggle();
      };

      // don't apply changes
      scope.cancel = function(){
        scope.localModel = scope.model;
        scope.toggle();
      };

      //toggles the editState of our field
      scope.toggle = function () {
        scope.editState = !scope.editState;
        //a little hackish - find the "type" by class query
        var x1 = element[0].querySelector("."+scope.type);
        // could not figure out how to focus on the text field, needed $timout
        //http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field-in-angularjs
        $timeout(function(){
          // focus if in edit, blur if not. some IE will leave cursor without the blur
          scope.editState ? x1.focus() : x1.blur();
        }, 0);
      }
    }
  }
});*/



app.directive('clickToEditNbr', function($timeout) {
  return {
    require: 'ngModel',
    scope: {
      model: '=ngModel',
      type: '@type'
    },
    replace: true,
    transclude: false,
    // includes our template
    template:
    '<div class="templateRoot">'+
    '<div class="hover-edit-trigger" title="click to edit">'+
    '<div class="hover-text-field" ng-show="!editState" ng-click="toggle()">{{model | number: 0}}<div class="edit-pencil glyphicon glyphicon-pencil"></div></div>'+
    '<div class="input-group">' +
    '<input type="number" class="input-xs inputNumber form-control small-button" ng-model="localModel" ng-enter="save()" ng-show="editState && type == \'inputNumber\'">' +
    '<div class="input-group-btn" ng-show="editState">' +
    '<button class="btn btn-default btn-xs" type="button" ng-click="save()"><span class="glyphicon glyphicon-ok"></span></button>' +
    '<button class="btn btn-default btn-xs" type="button" ng-click="cancel()"><span class=" glyphicon glyphicon-remove"></span></button>' +
    '</div>' +
    '</div>' +
    '</div>'+
    '</div>',
    link: function (scope, element, attrs) {
      scope.editState = false;
      // make a local ref so we can back out changes, this only happens once and persists
      scope.localModel = Math.round(scope.model);

      // apply the changes to the real model
      scope.save = function(){
        scope.model = scope.localModel;
        scope.toggle();
      };

      // don't apply changes
      scope.cancel = function(){
        scope.localModel = scope.model;
        scope.toggle();
      };

      //toggles the editState of our field
      scope.toggle = function () {
        scope.localModel = Math.round(scope.model);
        scope.editState = !scope.editState;
         // a little hackish - find the "type" by class query
        var x1 = element[0].querySelector("."+scope.type);
        /* could not figure out how to focus on the text field, needed $timeout
         * http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field-in-angularjs */
        $timeout(function(){
          // focus if in edit, blur if not. some IE will leave cursor without the blur
          scope.editState ? x1.focus() : x1.blur();
        }, 0);
      }
    }
  }
});


// Valid edition when "enter" is pressed
// http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});
