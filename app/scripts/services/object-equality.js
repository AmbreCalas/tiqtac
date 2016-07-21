'use strict';
// Compare 2 objects

function isObjectsEquals(a, b) {
  var isOK = true;
  for (var prop in a) {
    if (a.hasOwnProperty(prop)) {
      if (a[prop] !== b[prop]) {
        isOK = false;
        break;
      }
    }
  }
  return isOK;
}

app.factory('ObjectEquality', function(){
  return function(objectA, objectB) {
    return isObjectsEquals(objectA, objectB);
  };
});
