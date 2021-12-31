//var GraphPlayer = require('./GraphPlayer.js');
//var GraphNode = require('./GraphNode.js');
//const clonedeep = require('lodash.clonedeep');
import {cloneDeep} from '../node_modules/lodash.clonedeep/index.js';
import {GraphNode} from './GraphNode.js';
import {GraphPlayer} from './GraphPlayer.js';

export class Graph{

  /*
  Graph is represented by adjacency list(MAP) in which each node in graph represents a key and its neighbors nodes represents the values
  */


  constructor(){
    this.edgeList = [];
    this.arr = [];
    this.visitedNodes = new Set();
    this.pTeritorries = [0,0];
    this.pArmies = [0,0];
    // this.p2Teritorries = 0;
    // this.p2Armies = 0;
    // this.player1 = new GraphPlayer.GraphPlayer(1);
    // this.player2 = new GraphPlayer.GraphPlayer(2);
  }

  // getPlayer(playerNo){
  //   if (playerNo == 1){
  //     return this.player1;
  //   }
  //   return this.player2;
  // }

  _adjustNode(node){

    if(!this.visitedNodes.has(node.getNodeNo())){

      if(node.getPlayer() == 1){
        this.arr[node.getNodeNo()] = node.getArmies();
        this.pTeritorries[0] += 1;
        this.pArmies[0] += node.getArmies();
        // this.player1.setTeritorriesNo(this.player1.getTeritorriesNo() + 1);
        // this.player1.setArmiesNo(this.player1.getArmiesNo() + node.getArmies());
      }
      else {
        this.arr[node.getNodeNo()] = -1 * node.getArmies();
        this.pTeritorries[1] += 1;
        this.pArmies[1] += node.getArmies();
        // this.player2.setTeritorriesNo(this.player2.getTeritorriesNo() + 1);
        // this.player2.setArmiesNo(this.player2.getArmiesNo() + node.getArmies());
      }
      this.visitedNodes.add(node.getNodeNo());
    }
  }

  // add edge to the graph by identifying both nodes in this edge (edge is directed because this will facilitate contructing the graph of players
  // by looping over each node and its neighbors)
  addEdge(node1 , node2){
    this.edgeList.push([node1 , node2]);
    this._adjustNode(node1);
    this._adjustNode(node2);

  }


  // returns map that represents the graph
  getEdges(){
    return this.edgeList;
  }


  // get a specific node by its number
  getNode(nodeNo){
    var allEdges = this.edgeList;
    for (var i = 0; i < allEdges.length;i++){
      var nodes = allEdges[i];
      for (var j = 0; j < nodes.length; j++ ){
        var currNodeNo = nodes[j].getNodeNo();

        if(currNodeNo == nodeNo){
          return nodes[j];
        }
      }
    }
  }


  // get children nodes to be attackable
  getChildrenEdges(){
    var allEdges = this.edgeList;
    let childrenList = [];
    for( var i = 0; i < allEdges.length; i++){
      var nodes = allEdges[i];
      if(nodes[0].getPlayer() != nodes[1].getPlayer()){
        var dif = nodes[0].getArmies() - nodes[1].getArmies();
        if (nodes[0].getPlayer() == 1){
            childrenList.push([nodes[0] , nodes[1], dif]);
        } else {
          childrenList.push([nodes[1] , nodes[0], -dif]);
        }
      }
    }
    return childrenList;
  }

  getChildren(player){ /// 1 or 2
    // var childrenEdgeList = this.getChildrenEdges();
    // var newchildEdgeList = [];
    // var neededarmies = [];
    // var afterPlacingArmies =  clonedeep(this);
    // var newarr = afterPlacingArmies.getGraphArray();
    // var additnalArrmies = Math.max(this.p1Teritorries/3,3) ////////// players
    // for( var i = 0; i < childrenEdgeList.length; i++){
    //   var attakEdge = childrenEdgeList[i]
    //   if(attakEdge[2] >1){ /////////////////
    //     neededarmies.push(0);
    //     newchildEdgeList.push(childrenEdgeList[i])
    //   } else {
    //     neededarmies.push(Math.abs(attakEdge[2])+2);
    //   }
    // }
    // while(additnalArrmies > 0){
    //   var minI = this.indexOfMin(neededarmies);
    //   var taken = childrenEdgeList[minI][2];
    //   if(taken==0){
    //     newarr[childrenEdgeList[minI][0].getNodeNo()] +=additnalArrmies;
    //     var temp = afterPlacingArmies.getNode(childrenEdgeList[minI][0].getNodeNo());
    //     temp.setArmies(temp.getArmies()+additnalArrmies);
    //     additnalArrmies = 0;
    //     break;
    //   }
    //   additnalArrmies -= taken;
    //   if(additnalArrmies < 0){
    //     taken+= additnalArrmies;
    //   } else {
    //     newchildEdgeList.push(childrenEdgeList[minI])
    //   }
    //   childrenEdgeList[minI][2] -= taken;
    //   var nodeno = childrenEdgeList[minI][0].getNodeNo();
    //   newarr[nodeno] +=taken;
    //   var temp = afterPlacingArmies.getNode(nodeno);
    //   temp.setArmies(temp.getArmies()+taken);
    // }
    // afterPlacingArmies.setGraphArray(newarr);
    player-=1;
    var childrenEdgeList = this.getChildrenEdges();
    var newchildEdgeList = [];
    var neededarmies = [];
    var afterPlacingArmies =  clonedeep(this);
    var newarr = afterPlacingArmies.getGraphArray();
    var additnalArrmies = Math.max(this.pTeritorries[player]/3,3);
    console.log("additnalArrmies "+additnalArrmies );
    console.log(this.pTeritorries);
    console.log(this.pArmies);
    this.pArmies[player]+= additnalArrmies;
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
      var taken = neededarmies[minI];
      console.log("minI " + minI + " taken "+taken);

      if(taken==0){
        newarr[childrenEdgeList[minI][player].getNodeNo()] +=additnalArrmies;
        var temp = afterPlacingArmies.getNode(childrenEdgeList[minI][player].getNodeNo());
        temp.setArmies(temp.getArmies()+Math.abs(additnalArrmies));
        additnalArrmies = 0;
        break;
      }
      additnalArrmies -= taken;
      if((additnalArrmies < 0&& player == 0 ) || (additnalArrmies > 0 && player == 1 )){
        taken+= additnalArrmies;
      } else {
        newchildEdgeList.push(childrenEdgeList[minI])
      }
      childrenEdgeList[minI][2] -= taken;
      var nodeno = childrenEdgeList[minI][player].getNodeNo();
      newarr[nodeno] +=taken;
      //var temp = afterPlacingArmies.getNode(nodeno);
      console.log("beforePlacingArmies= " + afterPlacingArmies.getNode(nodeno).getArmies());
      console.log("taken "+taken);
      afterPlacingArmies.getNode(nodeno).setArmies(afterPlacingArmies.getNode(nodeno).getArmies()+Math.abs(taken));
      console.log("afterPlacingArmies= " + afterPlacingArmies.getNode(nodeno).getArmies());

    }
    afterPlacingArmies.setGraphArray(newarr);
    console.log("afterPlacingArmies.printEdges();");
    afterPlacingArmies.printEdges();
    console.log("finish afterPlacingArmies.printEdges();afterPlacingArmies.printEdges();");
    var childList = []
    for (var i = 0;i<newchildEdgeList.length;i++){
      var newChild = this.attack(newchildEdgeList[i],afterPlacingArmies,player);
      childList.push(newChild);
    }
    return childList;
  }

  attack(attakEdge,afterPlacingArmies,player){
    var newChild = clonedeep(afterPlacingArmies);
    var newarr = newChild.getGraphArray();
    var nodeNum = attakEdge[player].getNodeNo();
    var nodeNum2 = attakEdge[(player+1)%2].getNodeNo();

    console.log("attakEdge[player].getArmies()= "+afterPlacingArmies.getNode(nodeNum).getArmies());
    var attackArmies = afterPlacingArmies.getNode(nodeNum).getArmies()-1;
    var sign;
    if(player == 0){
      sign = 1;
    } else {
      sign = -1;
    }
    newarr[attakEdge[player].getNodeNo()] = sign *1;
    newarr[attakEdge[(player+1)%2].getNodeNo()] = sign *(attackArmies-afterPlacingArmies.getNode(nodeNum2).getArmies());
    newChild.setGraphArray(newarr);
    var temp1 = newChild.getNode(attakEdge[player].getNodeNo());
    temp1.setArmies(1);
    var temp2 = newChild.getNode(attakEdge[(player+1)%2].getNodeNo());
    console.log("attackArmies= "+attackArmies+" attakEdge[(player+1)%2].getArmies()= "+afterPlacingArmies.getNode(nodeNum2).getArmies());
    temp2.setArmies(attackArmies-afterPlacingArmies.getNode(nodeNum2).getArmies());
    temp2.setPlayer(player+1);
    return newChild;
  }

  getGraphArray(){
    return this.arr;
  }

  setGraphArray(newarr){
    var arr = clonedeep(newarr);
  }

  indexOfMin(a) {
      if (a.length === 0) {
          return -1;
      }
      var min = a[0];
      var minIndex = 0;
      for (var i = 1; i < this.arr.length; i++) {
          if ((a[i] < min && a[i] != 0) || min == 0) {
              minIndex = i;
              min = a[i];
          }
      }
      return minIndex;
  }

  // just for testing
  printEdges(){
    var allKeys = this.edgeList;
    for(var i = 0; i < allKeys.length; i++ ){
      var values = allKeys[i];
      for(var j = 0; j<values.length; j++){
          console.log('pair ' + i + ' : ' + values[j].getNodeNo() + ' , armies: ' + values[j].getArmies() + ' , player: ' + values[j].getPlayer());
      }

      console.log('---------------------------');
    }
  }


  heuristic(){
    var h = 0;
    var numTeritoriesNos = this.pTeritorries[0];
    var numArmies = this.pArmies[0];
    h = numTeritoriesNos + 2 * numArmies;
    return h;
  }

}

