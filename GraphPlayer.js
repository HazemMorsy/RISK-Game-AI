//var graphFile = require('./Graph.js');

class GraphPlayer{


 /*
 graph palyer is constructed by using the current player number and the main graph that represents the map
 */
  constructor(playerNo){
    //this.mainGraph = mainGraph;
    this.playerNo = playerNo;
    //this.graphPlayer = new graphFile.Graph();
    this.teritoriesNo = 0;
    this.armiesNo = 0;
  }

  setPlayerNo(playerNO){
    this.playerNo = playerNO;
  }

  getPlayerNo(){
    return playerNO;
  }

  setTeritorriesNo(teritoriesNo){
    this.teritoriesNo = teritoriesNo;
  }

  getTeritorriesNo(){
    return this.teritoriesNo;
  }

  setArmiesNo(armiesNo){
    this.armiesNo = armiesNo;
  }

  getArmiesNo(){
    return this.armiesNo;
  }



  /*buildGraph(){
    var mainEdgeList = this.mainGraph.getEdges();
    let visitedNodes = new Set();

    // loop on array of edges
    for (var i = 0; i < mainEdgeList.length; i++){
      var node1 = mainEdgeList[i][0];
      var node2 = mainEdgeList[i][1];

      if (node1.getPlayer() == this.playerNo && !visitedNodes.has(node1.getNodeNo())){
        this.teritoriesNo += 1;
        this.armiesNo += node1.getArmies();
        visitedNodes.add(node1.getNodeNo());
      }

      if(node2.getPlayer() == this.playerNo && !visitedNodes.has(node2.getNodeNo())){
        this.teritoriesNo += 1;
        this.armiesNo += node2.getArmies();
        visitedNodes.add(node1.getNodeNo());
      }

      // add edge in graph player if both nodes belong to the same player
      if (node1.getPlayer() == this.playerNo && node2.getPlayer() == this.playerNo){
        this.graphPlayer.addEdge(node1 , node2);
      }
    }

  }



  printGraph(){
    this.graphPlayer.printEdges();
  }*/

}

module.exports.GraphPlayer = GraphPlayer;
