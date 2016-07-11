'use strict';

// Sum fbl costs
var calculateTotals = function(fblList) {
  var res = {
    fbl_name: 'Total',
    points: 0,
    md: 0,
    risk: 0,
    estimate_md: 0,
    probability: 0
  };
  for(var i = 0; i < fblList.length; i++) {
    res.points += fblList[i].points;
    res.md += fblList[i].md;
    res.risk += fblList[i].risk;
    res.estimate_md += fblList[i].estimate_md;
  }
  return res;
};

// Sum fbl costs balanced by their probability
var calculateBalances = function(fblList) {
  var res = {
    fbl_name: 'Balanced total',
    points: 0,
    md: 0,
    risk: 0,
    estimate_md: 0,
    probability: 0
  };
  for(var i = 0; i < fblList.length; i++) {
    res.points += fblList[i].points * fblList[i].probability;
    res.md += fblList[i].md * fblList[i].probability;
    res.risk += fblList[i].risk * fblList[i].probability;
    res.estimate_md += fblList[i].estimate_md * fblList[i].probability;
  }
  return res;
};



/* Calculate total and balanced total for a PI */
app.factory('TotalCalculator', function(){
  return function(fblList) {
    var results = {};
    results.totals = calculateTotals(fblList);
    results.balances = calculateBalances(fblList);
    return results;
  };
});
