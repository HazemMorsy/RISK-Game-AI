// var graphNodeFile = require('./GraphNode.js');
// var graphFile = require('./Graph.js');
var graphFile = require('./newGraph.js');

// var graphPlayerFile = require('./GraphPlayer.js');
var mapshape = require('./Mapshape.js');
var mapShapeFile = require('./MapShape.js');
var minmax = require('./Min_Max.js');

// var mshape = new mapShapeFile.Mapshape(1 , 2 , 'Egypt' , 1);  //.MapShape(1 , 2 , 'Egypt' , 1);
//
// mshape.createMap();
//
// var mainG = mshape.getMainGraph();
// mainG.getChildren();
// mainG.getChildrenEdges();
//

// let mainG = new graphFile.Graph();
// let gNode1 = new graphNodeFile.GraphNode(1 , 1 , 10);
// let gNode2 = new graphNodeFile.GraphNode(2 , 1 , 5);
// let gNode3 = new graphNodeFile.GraphNode(3 , 2 , 7);
// let gNode4 = new graphNodeFile.GraphNode(4 , 1 , 6);
// let gNode5 = new graphNodeFile.GraphNode(5 , 2 , 3);
// let gNode6 = new graphNodeFile.GraphNode(6 , 2 , 8);
//
//
// mainG.addEdge(gNode1 , gNode2);
// mainG.addEdge(gNode1 , gNode3);
// mainG.addEdge(gNode1 , gNode4);
// mainG.addEdge(gNode1 , gNode5);
// mainG.addEdge(gNode1 , gNode6);
//
// mainG.addEdge(gNode3 , gNode4);
//
// mainG.addEdge(gNode5 , gNode6);
//
// mainG.printEdges();
// let mainG = new graphFile.Graph();
let mainG = new graphFile.newGraph();
let gNode1 = [0,10];
let gNode2 = [1,5];
let gNode3 = [2,-7];
let gNode4 = [3,6];
let gNode5 = [4,-3];
let gNode6 = [5,-8];


mainG.addEdge(gNode1 , gNode2);
mainG.addEdge(gNode1 , gNode3);
mainG.addEdge(gNode1 , gNode4);
mainG.addEdge(gNode1 , gNode5);
mainG.addEdge(gNode1 , gNode6);

mainG.addEdge(gNode3 , gNode4);

mainG.addEdge(gNode5 , gNode6);

// mainG.printEdges();
// console.log('--------------------******-------------------');
//
// mainG.getChildren(1);
// var list = mainG.getChildren(1)
// console.log(list.length);
// for (var i = 0; i<list.length;i++){
//   list[i].printEdges()
// }
console.log('--------------------******-------------------');

console.log("Before search");
mainG.printEdges()
var mm = new minmax.Min_Max();
var child = mm.Decision(mainG);
console.log("After Placing Armies");
child[1].printEdges()
console.log("After search");
child[0].printEdges()
// child.printEdges();
// mainG.getChildren();
/*console.log('palyer 1 Graph');

let gPlayer1 = new graphPlayerFile.GraphPlayer(mainG , 1);
gPlayer1.buildGraph();
gPlayer1.printGraph();


console.log('palyer 2 Graph');

let gPlayer2 = new graphPlayerFile.GraphPlayer(mainG , 2);
gPlayer2.buildGraph();
gPlayer2.printGraph();*/
// let map = new mapshape.Mapshape("n","k","Egypt","j");
// map.createMap();
