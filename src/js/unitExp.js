/**
 * Created by muhiro on 2014/08/25.
 */
var unitExp = unitExp || {};
(function() {
  var db = new aigisWidget.aigisdb();
  var exp = db.getUnitexp();
  var grows = ['normal','cc','awake', 'awake2'];

  unitExp.getMaxLevel = function(rarity, grow) {
    return exp.meta[rarity][grow];
  };

  unitExp.getAmountOfExperience = function(rarity, level) {
    var v = 0;
    if (exp.meta[rarity].level.length >= level) {
      v = exp.meta[rarity].level[Number(level) - 1];
    }
    return v;
  };

  unitExp.getNextLevelExperience = function(rarity, grow, level) {
    var v1 = 0;
    var v2 = 0;
    var mlvl = unitExp.getMaxLevel(rarity, grow);
    if (level != mlvl) {
      if (exp.meta[rarity].level.length > level) {
        v1 = exp.meta[rarity].level[Number(level) - 1];
        v2 = exp.meta[rarity].level[Number(level)];
      }
    }
    return v2 - v1;
  };

  unitExp.getMaxLevelExperienceNeeded = function(rarity, nowgrow, level, exp, nextgrow, nextlevel) {
    var idx = grows.indexOf(nowgrow);
    var nidx = grows.indexOf(nextgrow);
    var now = Number(unitExp.getAmountOfExperience(rarity, level))
      + (Number(unitExp.getNextLevelExperience(rarity, nowgrow, level)) - Number(exp));
    var sum = 0;
    for (var i = idx; i <= nidx; i++) {
      var lvl = 0;
      if ( (nextlevel == undefined) || (i != nidx) ) {
        lvl = unitExp.getMaxLevel(rarity, grows[i]);
      } else {
        lvl = nextlevel;
      }
      sum += Number(unitExp.getAmountOfExperience(rarity, lvl));
    }
    return sum - now;
  };

})();
