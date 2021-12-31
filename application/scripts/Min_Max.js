class Min_Max {

  constructor () {
    this.states_list = new Map()
  }

  Decision (state,player) {
    var child;
      child = this.Maximize(state, -1000, 1000, 0, player) // child is Tuple first element is clild state second is utility third is lastmove
    console.log("Expanded nodes = " + this.states_list.size)
    return [child[0],child[2]]
  }

  Maximize (state, alpha, beta, turn, player) { // turn 0, 1, 2 or 3
    console.log("Expanded nodes = " + this.states_list.size)
    var garray = state.getGraphArray()
    var pagg
    if (player == 1){
      pagg = 2
    } else {
      pagg = 1
    }
    var ts = this.Terminal_Test(garray)
    if (ts == player) {
      return [state, 1]
    } else if (ts == pagg) {
      return [state, -1]
    }
    if (this.states_list.has([turn, garray])) {
      return states_list.get([turn, garray])
    }
    var childList
    var apa
    [apa, childList] = state.getChildren(player,turn)
    if (childList.length <= 0) {
      temp = this.Minimize(state, alpha, beta, 0,player)
    }
    var maxchild = [null, -1000, apa]
    var lastchild = [null, -1000, apa]
    for (var i = 0; i < childList.length; i++) {
      var child = childList[i]
      var temp
      if (turn == 3) {
        temp = this.Minimize(child, alpha, beta, 0, player)
      } else {
        turn += 1
        temp = this.Maximize(child, alpha, beta, turn, player)
      }
      if (temp[1] > maxchild[1]) {
        maxchild[0] = child
        maxchild[1] = temp[1]
      }
      if (maxchild[1] >= beta) {
        break
      }
      if (maxchild[1] > alpha) {
        alpha = maxchild[1]
      }
    }
    this.states_list.set([turn, garray], maxchild)
    return maxchild
  }

  Minimize (state, alpha, beta, turn, player) {
    var garray = state.getGraphArray()
    var pagg
    if (player == 1){
      pagg = 2
    } else {
      pagg = 1
    }
    var ts = this.Terminal_Test(garray)
    if (ts == player) {
      return [state, 1]
    } else if (ts == pagg) {
      return [state, -1]
    }

    if (this.states_list.has([turn, garray])) {
      return states_list.get([turn, garray])
    }
    var childList
    var apa

    [apa,childList] = state.getChildren(pagg,turn)
    var minchild = [null, 1000, apa]
    // var childList = state.getChildren(2,turn)
    if (childList.length <= 0) {
      temp = this.Maximize(state, alpha, beta, 0,player)
    }
    for (var i = 0; i < childList.length; i++) {
      var temp
      var child = childList[i]
      if (turn == -3) {
        temp = this.Maximize(child, alpha, beta, 0, player)
      } else {
        turn -= 1
        temp = this.Minimize(child, alpha, beta, turn, player)
      }
      if (temp[1] < minchild[1]) {
        minchild[0] = child
        minchild[1] = temp[1]
      }
      if (minchild[1] <= alpha) {
        break
      }
      if (minchild[1] < beta) {
        beta = minchild[1]
      }
    }
    this.states_list.set([turn, garray], minchild)
    return minchild
  }

  checkpos (element) {
    return element > 0
  }
  checkneg (element) {
    return element < 0
  }
  Terminal_Test (array) {
    if (array.every(this.checkpos)) {
      return 1
    } else if (array.every(this.checkneg)) {
      return 2
    } else {
      return 0
    }
  }
}
module.exports.Min_Max = Min_Max
