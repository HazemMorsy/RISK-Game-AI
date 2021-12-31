
var agentFile = require('./Agent.js');

class Greedy extends agentFile.Agent{

  constructor(){
    super();
  }

  performSearch(initGraph , playerNo){
    // array of [afterPlacingArmies , childList]
    var placingAttacks = initGraph.getChildren(playerNo , 0);
    var childernStates = placingAttacks[1];
    var maxIndex = 0;
    var maxHeurstic = 0;
    for (var i = 0; i<childernStates.length; i++){
        var currHeuristic = childernStates[i].heuristic(playerNo);
        if(currHeuristic > maxHeurstic){
          maxHeurstic = currHeuristic;
          maxIndex = i;
        }
    }
    return [placingAttacks[0] , childernStatess[maxIndex]];
  }

}

module.exports.Greedy = Greedy;
