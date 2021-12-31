
class MapState {
/// DONOT USE IT, MFE4 7AGA S7 FIHA HKML LMA AS7A W AFHAM ELBA2Y 😂

 /*
 Map State is current state of the game which contains all players graphs and the main graph
 */

  constructor (mainGraph, players) {
    this.mainGraph = mainGraph
    this.players = players
  }

  int eval (current_player) {
    armies_owned = players[current_player].armies_owned // need to add armies_owned to each player
    enemy_armies = 0
    for (int i = 0; i<players.size() && i != current_player;i++){
      enemy_armies += players[i].armies_owned
    }
    return (armies_owned/enemy_armies)
  }

  var get_childrens(current_player){
    var childs = []
    var alledges = mainGraph.getEdges
    var inneredges = []
    int extra_armies = Math.floor(players[current_player].getNodeNo/3)
    if (extra_armies<3){
      extra_armies = 3
    }
    for (int i = 0; i<players.size() ;i++){
      inneredges.push(players[i].getEdges)
    }
    // need to remove inner edges from all edges and get the attack edges
    var attack_edges
    for (int i = 0;i<attack_edges.size();i++){
      // if any of two nodes is for current_player
        // check if current armies in node + extra_armies >= enemy armies in other node do attack
        // after attake get a new MapState and add to childs
    }
    return childs
  }
}

module.exports.GraphPlayer = MapState
