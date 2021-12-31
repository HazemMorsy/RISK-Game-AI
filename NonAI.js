const clonedeep = require('lodash.clonedeep');
class NonAI {

  constructor () {
  }

  Pasive (state, player) {
      var array = state.getGraphArray();
      var additnalArrmies =  Math.max(Math.floor(state.pTeritorries[player-1]/3),3);
      if (player == 1){
        var minI = -1;
        var min = 10000;
        for (var i = 0; i<array.length;i++){
          if (array[i] < min && array[i] > 0){
            minI = i;
            min = array[i];
          }
        }
        array[minI] +=additnalArrmies;
      } else {
        var minI = -1;
        var min = -10000;
        for (var i = 0; i<array.length;i++){
          if (array[i] > min && array[i] < 0){
            minI = i;
            min = array[i];
          }
        }
        array[minI] -=additnalArrmies;
      }
      var newChild = clonedeep(state);
      newChild.setGraphArray(array);
      newChild.pArmies[player-1] +=additnalArrmies;
      return [newChild,newChild]
    }

  pacifist (state, player) {
    var apa = this.Pasive(state, player)[0]
    var childEdgeList = apa.getChildrenEdges(player)
    var MinEdge = 0
    var MinI = -1
    for (var i = 0; i < childEdgeList.length;i++){
      var attackEdge = childEdgeList[i];
      if (player == 1){
        if(MinEdge < attackEdge[2] && attackEdge[2] > 0){
          MinI = i;
          MinEdge = attackEdge[2]
        }
      } else {
        if(MinEdge > attackEdge[2] && attackEdge[2] < 0){
          MinI = i;
          MinEdge = attackEdge[2]
        }
      }
    }
    if (MinI == -1){
      console.log("Can't Attack");
      return [apa,apa]
    }
    var attackEdge = childEdgeList[MinI];
    var child = apa.attack(attackEdge,apa,player-1)
    return [child,apa]
  }

  aggressive (state, player) {
    var array = state.getGraphArray();
    var additnalArrmies =  Math.max(Math.floot(state.pTeritorries[player-1]/3),3);
    if (player == 1){
      var maxI = -1;
      var max = -1;
      for (var i = 0; i<array.length;i++){
        if (array[i] > max && array[i] > 0){
          maxI = i;
          max = array[i];
        }
      }
      array[maxI] +=additnalArrmies;
    } else {
      var maxI = -1;
      var max = 1;
      for (var i = 0; i<array.length;i++){
        if (array[i] < max && array[i] < 0){
          maxI = i;
          max = array[i];
        }
      }
      array[maxI] -=additnalArrmies;
    }
    var apaG = clonedeep(state);
    apaG.setGraphArray(array);
    apaG.pArmies[player-1] +=additnalArrmies;
    // placing armies finished
    var childernStates
    var temp
    [temp, childernStates] = apaG.getChildren(player , 1);
    var maxIndex = 0;
    var maxHeurstic = 0;
    for (var i = 0; i<childernStates.length; i++){
        var currHeuristic = childernStates[i].heuristic(player);
        if(currHeuristic > maxHeurstic){
          maxHeurstic = currHeuristic;
          maxIndex = i;
        }
    }
    return [childernStates[maxIndex],apaG];
  }

}
module.exports.NonAI = NonAI
