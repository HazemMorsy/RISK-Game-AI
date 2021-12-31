

class Greedy{

  constructor(initGraph , playerNo , flag){
    this.initGraph = initGraph;
    this.playerNo = playerNo;
    this.flag = flag;
  }

  performSearch(){
    var childernStates = this.initGraph.getChildren(this.playerNo , this.flag);
    var maxIndex = 0;
    var maxHeurstic = 0;
    for (var i = 0; i<childernStates.length; i++){
        currHeuristic = childernStates[i].heuristic(this.playerNo , this.flag);
        if(currHeuristic > maxHeurstic){
          maxHeurstic = currHeuristic;
          maxIndex = i;
        }
    }
    return childernStates[maxIndex];
  }

}
