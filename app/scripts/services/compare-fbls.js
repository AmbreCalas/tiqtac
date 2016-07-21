'use strict';
/* Calculate total and balanced total for a PI */

app.factory('ReturnChangedFbl', ['ObjectEquality', function(ObjectEquality){
  return function(oldFbls, newFbls) {
    var oldChangedFbls = [];
    var newChangedFbls = [];
    // Create a copy of "newFbls" in order to get rounded values without change on newFbls
    var newFblsRounded = angular.copy(newFbls);

    for(var i = 0; i < newFbls.length; i++) {
      newFblsRounded[i].points = Math.round(newFbls[i].points);
      newFblsRounded[i].md = Math.round(newFbls[i].md);
      newFblsRounded[i].risk = Math.round(newFbls[i].risk);
      newFblsRounded[i].estimate_md = Math.round(newFbls[i].estimate_md);

      // Check if rounded values of newFbls are the same as oldFbls
      if(newFbls[i].probability !== 0 && !ObjectEquality(oldFbls[i], newFblsRounded[i])) {
        // Add fbls which have changed
        newChangedFbls.push(newFblsRounded[i]);
        oldChangedFbls.push(oldFbls[i]);
      }
    }
    return {oldChangedFbls, newChangedFbls};
  };
}]);
