class A_Star {
  constructor (playerNo) {
    this.playerNo = playerNo;
    if(playerNo == 1){
      this.turn = 1;
    }else{
      this.turn = 2;
    }
  }
  checkpos (element) {
    return element > 0
  }
  checkneg (element) {
    return element < 0
  }
  goalTest(array){
    if (array.every(this.checkpos)) {
      return true
    } else if (array.every(this.checkneg)) {
      return true
    } else {
      return false
    }
  }

  findMaxCost(frontier){
    var list;
    var maxCost = 0;
    frontier.forEach(function(value, key) {
      if(value > maxCost){
        list = key
        maxCost = value
        console.log("enter max cost="+ value + " value "+list);
      }
      //console.log(key + ' = ' + value)
    })
    return list
  }

  search (mainG) {
    console.log("enter");
    let frontier = new Map()
    let explored = new Set()
    let costs = new Set()
    let heapAllPossipleAttack =  new Map();
    var cost;

    var allPossipleAttack
    var finalApa
    [finalApa, allPossipleAttack] = mainG.getChildren(this.playerNo, 0)
    //var allPossipleAttack  = this.mainGraph.getChildren(1, 0);
    console.log("allPossipleAttack.length " + allPossipleAttack.length);
    for (var i = 0; i < allPossipleAttack.length; i++){
      cost = allPossipleAttack[i].heuristic(this.playerNo);
      heapAllPossipleAttack.set(allPossipleAttack[i], cost);
    }
    for(var pass = 0; pass < allPossipleAttack.length; pass++){
      console.log("******************"+pass);
      var list = this.findMaxCost(heapAllPossipleAttack);
      heapAllPossipleAttack.delete(list);
      cost = list.heuristic(this.playerNo);
      console.log("cost(0)= " + cost);
      frontier.set(list, cost + this.turn);
      var level= 0
      while (frontier.size != 0) {
        level++;
        var list = this.findMaxCost(frontier);
        costs.add(frontier.get(list))
        frontier.delete(list);
        console.log("frontier.size= " + frontier.size);
        explored.add(list);

        var terminal = this.goalTest(list.getGraphArray())
        if(terminal){
          console.log("explored " + explored.size);
          var i = 0;
          for (let item of explored){
            console.log("#########"+i);
            item.printEdges()
            i++
          }
          var i = 0;
          for (let item of costs){
            console.log("#########"+i+"   "+item);
            i++
          }
          console.log("************terminal*************");
          list.printEdges()
          this.turn=this.turn +2;
          return [finalApa, list];
        }
        var currPossipleAttack
        var apa
        [apa,currPossipleAttack] =  list.getChildren(this.playerNo, 1)
        console.log("currPossipleAttack length= "+currPossipleAttack.length);
        for(var i = 0; i < currPossipleAttack.length; i++) {
          var neighbor = currPossipleAttack[i];
          if(!frontier.has(neighbor) && !explored.has(neighbor)) {
            console.log("enter 2 union");
            cost = neighbor.heuristic(this.playerNo) + level + this.turn;
            frontier.set(neighbor, cost);
          } else if(frontier.has(neighbor)) {
            console.log("enter 1 union");
            cost = neighbor.heuristic(this.playerNo) + level + this.turn;
            if(cost > frontier.get(neighbor)){
              console.log("enter update");
              frontier.set(neighbor, cost);
            }
          }
          console.log("cost("+i+")= " + cost);

      }

    }
    }
    this.turn=this.turn +2;

    return [finalApa, list];
  }
}
