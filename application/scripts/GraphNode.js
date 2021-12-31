

export class GraphNode {

  /*
  node in graph is identified by its number on map , its palyer number and no of armies on this node
  node simply represents a teritory on map.
   */

  constructor(nodeNo ,player , armies)
  {
    this.nodeNo = nodeNo;
    this.player = player;
    this.armies = armies;
  }

  setNodeNo(nodeNo){
    this.nodeNo = nodeNo;
  }

  getNodeNo(){
    return this.nodeNo;
  }

  setPlayer(player){
    this.player = player;
  }

  getPlayer(){
    return this.player;
  }

  setArmies(armies){
    this.armies = armies;
  }

  getArmies(){
    return this.armies;
  }


}
