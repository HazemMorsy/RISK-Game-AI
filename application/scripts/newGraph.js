import {cloneDeep} from '../node_modules/lodash.clonedeep/index.js';

export class newGraph{

  /*
  Graph is represented by adjacency list(MAP) in which each node in graph represents a key and its neighbors nodes represents the values
  */

  constructor(){
    this.edgeList = []; // 2d array, each row has number of 2 nodes creating edge
    this.arr = []; // 1d array
    this.visitedNodes = new Set();
    this.pTeritorries = [0,0];
    this.pArmies = [0,0];
  }

  _adjustNode(node){

    if(!this.visitedNodes.has(node[0])){

      if(node[1] > 0){
        this.arr[node[0]] = node[1];
        this.pTeritorries[0] += 1;
        this.pArmies[0] += Math.abs(node[1]);
      }
      else {
        this.arr[node[0]] = node[1];
        this.pTeritorries[1] += 1;
        this.pArmies[1] += Math.abs(node[1]);
      }
      this.visitedNodes.add(node[0]);
    }
  }

  // add edge to the graph by identifying both nodes in this edge (edge is directed because this will facilitate contructing the graph of players
  // by looping over each node and its neighbors)
  addEdge(node1 , node2){ // each node is a pair <nodeID, (+/-) armiesNo
    this.edgeList.push([node1[0] , node2[0]]);
    this._adjustNode(node1);
    this._adjustNode(node2);
  }


  // returns map that represents the graph
  getEdges(){
    return this.edgeList;
  }

  // get children nodes to be attackable
  getChildrenEdges(){
    var allEdges = this.edgeList;
    let childrenList = [];
    for( var i = 0; i < allEdges.length; i++){
      var nodes = allEdges[i];
      if(this.arr[nodes[0]]/this.arr[nodes[1]] < 0 ){
        var dif = Math.abs(this.arr[nodes[0]]) - Math.abs(this.arr[nodes[1]]);
        if (this.arr[nodes[0]] > 0){ //player 1
            childrenList.push([nodes[0] , nodes[1], dif]);
        } else {
          childrenList.push([nodes[1] , nodes[0], (-1 * dif)]);
        }
      }
    }
    return childrenList;
  }

  placingArmies(player){
    player -=1;
    var childrenEdgeList = this.getChildrenEdges();
    var newchildEdgeList = [];
    var neededarmies = [];
    var afterPlacingArmies =  cloneDeep(this);
    var newarr = afterPlacingArmies.getGraphArray();
    var additnalArrmies = Math.max(Math.floor(this.pTeritorries[player]/3),3);
    afterPlacingArmies.pArmies[player]+= additnalArrmies;
    //console.log("******************");
    //console.log(afterPlacingArmies.pTeritorries);
    //console.log(afterPlacingArmies.pArmies);
    for( var i = 0; i < childrenEdgeList.length; i++){
      var attakEdge = childrenEdgeList[i]
      if(player == 0){
          if(attakEdge[2] >1){
            neededarmies.push(0);
            newchildEdgeList.push(childrenEdgeList[i])
          } else {
            neededarmies.push(Math.abs(attakEdge[2])+2);
          }
        } else {
          if(attakEdge[2] < -1){
            neededarmies.push(0);
            newchildEdgeList.push(childrenEdgeList[i])
          } else {
            neededarmies.push(Math.abs(attakEdge[2])+2);
          }
        }
    }
    if(player == 1){
      additnalArrmies = -1*additnalArrmies;
    }
    while((additnalArrmies > 0 && player == 0) || (additnalArrmies < 0 && player == 1)){
      var minI = this.indexOfMin(neededarmies);
      if (minI == -1){
        var attackEdge = childrenEdgeList[0];
        newarr[attackEdge[player]] +=additnalArrmies;
        additnalArrmies = 0;
        break;
      }
      for (var i = 0; i <neededarmies.length;i++){
      }
      var attackEdge = childrenEdgeList[minI];
      var taken = neededarmies[minI];
      if(taken==0){
        newarr[attackEdge[player]] +=additnalArrmies;
        additnalArrmies = 0;
        break;
      }
      additnalArrmies -= taken;
      if((additnalArrmies < 0&& player == 0 ) || (additnalArrmies > 0 && player == 1 )){
        taken+= additnalArrmies;
      } else {
        newchildEdgeList.push(attackEdge)
      }
      neededarmies[minI] -= taken;
      var nodeno = attackEdge[player];
      newarr[nodeno] +=taken;
    }
    afterPlacingArmies.setGraphArray(newarr);

    return [newchildEdgeList , afterPlacingArmies];
  }

  getChildren(player , flag){ /// 1 or 2   // if flag is zero place armies for first time else attack
     player -=1;
    var childrenEdgeList = this.getChildrenEdges();
    var newchildEdgeList = [];
    var neededarmies = [];
    var afterPlacingArmies =  cloneDeep(this);
    var newarr = afterPlacingArmies.getGraphArray();
    var additnalArrmies = Math.max(this.pTeritorries[player]/3,3);
    //console.log("******************");
    //console.log(afterPlacingArmies.pTeritorries);
    //console.log(afterPlacingArmies.pArmies);
    for( var i = 0; i < childrenEdgeList.length; i++){
      var attakEdge = childrenEdgeList[i]
      if(player == 0){
          if(attakEdge[2] >1){
            neededarmies.push(0);
            newchildEdgeList.push(childrenEdgeList[i])
          } else {
            neededarmies.push(Math.abs(attakEdge[2])+2);
          }
        } else {
          if(attakEdge[2] < -1){
            neededarmies.push(0);
            newchildEdgeList.push(childrenEdgeList[i])
          } else {
            neededarmies.push(Math.abs(attakEdge[2])+2);
          }
        }
    }
    if(player == 1){
      additnalArrmies = -1*additnalArrmies;
    }
    if(flag == 0){
    afterPlacingArmies.pArmies[player]+= additnalArrmies;
    while((additnalArrmies > 0 && player == 0) || (additnalArrmies < 0 && player == 1)){
      var minI = this.indexOfMin(neededarmies);
      if (minI == -1){
        var attackEdge = childrenEdgeList[0];
        newarr[attackEdge[player]] +=additnalArrmies;
        additnalArrmies = 0;
        break;
      }
      for (var i = 0; i <neededarmies.length;i++){
      }
      var attackEdge = childrenEdgeList[minI];
      var taken = neededarmies[minI];
      if(taken==0){
        newarr[attackEdge[player]] +=additnalArrmies;
        additnalArrmies = 0;
        break;
      }
      additnalArrmies -= taken;
      if((additnalArrmies < 0&& player == 0 ) || (additnalArrmies > 0 && player == 1 )){
        taken+= additnalArrmies;
      } else {
        newchildEdgeList.push(attackEdge)
      }
      neededarmies[minI] -= taken;
      var nodeno = attackEdge[player];
      newarr[nodeno] +=taken;
    }
  }
    afterPlacingArmies.setGraphArray(newarr);
    //console.log("****************");
    //afterPlacingArmies.printEdges();
    var childList = []
    for (var i = 0;i<newchildEdgeList.length;i++){
      var newChild = this.attack(newchildEdgeList[i],afterPlacingArmies,player);
      childList.push(newChild);
    }
    return [afterPlacingArmies,childList];
  }

  attack(attakEdge,afterPlacingArmies,player){
    var newChild = cloneDeep(afterPlacingArmies);
    var newarr = newChild.getGraphArray();
    var nodenum1 =  attakEdge[player]
    var nodenum2 = attakEdge[(player+1)%2]
    var attackArmies = afterPlacingArmies.getGraphArray()[nodenum1] - 1;  //.getNode(nodenum1).getarmies() - 1
    var sign;
    if(player == 0){
      sign = 1;
    } else {
      sign = -1;
    }
    newarr[attakEdge[player]] = sign *1;
    newarr[attakEdge[(player+1)%2]] = sign *(attackArmies-Math.abs(afterPlacingArmies.getGraphArray()[nodenum2]))
    newChild.setGraphArray(newarr);

    newChild.pArmies[0] -= Math.abs(afterPlacingArmies.getGraphArray()[nodenum2]);
    newChild.pArmies[1] -= Math.abs(afterPlacingArmies.getGraphArray()[nodenum2]);

    newChild.pTeritorries[player] += 1
    newChild.pTeritorries[(player + 1)%2] -= 1

    return newChild;
  }

  getGraphArray(){
    return this.arr;
  }

  setGraphArray(newarr){
    var arr = cloneDeep(newarr);
  }

  indexOfMin(a) {
      if (a.length == 0) {
          return -1;
      }
      var min = a[0];
      var minIndex = 0;
      for (var i = 1; i < a.length; i++) {
          if ((a[i] < min && a[i] != 0) || min == 0) {
              minIndex = i;
              min = a[i];
          }
      }
      if (min == 0){
        return -1;
      }
      return minIndex;
  }
  // just for testing
  printEdges(){
    var allKeys = this.edgeList;
    for(var i = 0; i < allKeys.length; i++ ){
      var values = allKeys[i];
      for(var j = 0; j<values.length; j++){
          var armies = this.arr[values[j]];
          var player = 1;
          if (armies < 0){
            player = 2;
          }
          console.log('pair ' + i + ' : ' + values[j] + ' , armies: ' + Math.abs(armies) + ' , player: ' + player);
      }

      console.log('---------------------------');
    }
  }


  heuristic(player){ // 1 or 2
    var h = 0;
    var numTeritoriesNos = this.pTeritorries[player-1];
    var numArmies = this.pArmies[player-1];
    h = numTeritoriesNos + 2 * numArmies;
    return h;
  }

}
