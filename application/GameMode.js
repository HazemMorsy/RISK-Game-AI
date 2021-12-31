const mode_modal = document.querySelector('.mode-modal');
const map_modal = document.querySelector('.map-modal');
const player_modal = document.querySelector('.player-modal');
const start_modal = document.querySelector('.start-modal');

var game_mode = {

}

function setMode(mode){
 game_mode.mode = mode;
 console.log(game_mode.mode);
 mode_modal.style.display = "none";
 map_modal.style.display = "block";
}
function setPlayers(agent){
	if(game_mode.mode == ModeEnum.playing){
		game_mode.player1 = AgentEnum.human;
		game_mode.player2 = agent;
		player_modal.style.display = "none";
 		start_modal.style.display = "block";
	} else if(game_mode.player1){//set player 2
		game_mode.player2 = agent;
		player_modal.style.display = "none";
 		start_modal.style.display = "block";
	} else {// set player1
		game_mode.player1 = agent;
		player_modal.style.display = "block";
		document.querySelector('#player-no').innerHTML = "Player 2";
	}
}

function setMap(map){
 game_mode.map = map;
 console.log(game_mode.map);
 map_modal.style.display = "none";
 player_modal.style.display = "block";
 if(game_mode.mode == ModeEnum.playing){
 	document.querySelector('#player-no').innerHTML = "Player 2";
 }
}

function changeToMap(event){
	localStorage.setItem("game_mode", JSON.stringify(game_mode));
	if(game_mode.map == MapEnum.Egypt){
		location.href='Egypt.html';
	}else{
		location.href='usa.html';
	}
}