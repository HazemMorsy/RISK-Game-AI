import { Mapshape } from './Mapshape.js';
var game_mode = JSON.parse(localStorage.getItem("game_mode"));
var turn = 1;
var reserve = document.querySelector(".reserve");
var player_name = document.querySelector(".player-name");
var turn_info = document.querySelector(".turn-info");
var turn_info_msg = document.querySelector(".turn-info-message");

var Agent1;
var Agent2;
var end;
var map;

function initializeGame(){
	console.log("initializeGame");

/*
	if(game_mode.map = MapEnum.Egypt){
		//set graph to Egypt
	}else{
		//set graph to Usa
	}*/
	map = new Mapshape("n","k","Egypt","j");
	player_name.innerHTML = "player " + turn;

	end = 0;

	switch(game_mode.player2){
		case AgentEnum.greedy:
		//Agent2 = 
		break;
		case AgentEnum.astar:
		//Agent2 = 
		break;
		case AgentEnum.passive:
		Agent2 = passiveAgent;
		break;
		case AgentEnum.astar:
		//Agent2 = 
		break;
		case AgentEnum.rtastar:
		//Agent2 = 
		break;
		case AgentEnum.aggressive:
		//Agent2 = 
		break;
		case AgentEnum.pacifist:
		//Agent2 = 
		break;
		case AgentEnum.minmax:
		//Agent2 = 
		break;
	}
}

function gameLoop(){

var state = "place_armies";

 while(end==0){

	player_name.innerHTML = "player " + turn;

	if(game_mode.mode == ModeEnum.playing && turn == 1){

			if(state == "place_armies"){
				turn_info_msg.innerHTML = "Click on your own areas to place reserve armies";

				var reserved_armies = 0;//get reserved armies

				// while reserved != 0 click on territory to place one army on it .. decrease reserved by one
				while(reserved_armies != 0){
					// click on territory to place one army on it
					/**
					place armies code
					*/
					reserved_armies -= 1;
				}

				state = "attack";

			}else{// state = attack
				turn_info_msg.innerHTML = "Choose a country to attack from then a target";
				/**
					attack code
				*/
				state = "place_armies";
				turn = 2; // end turn
			}

	} else if (turn == 1){// simulation && turn = 1
		turn_info.innerHTML = "place armies";
		turn_info_msg.innerHTML = "AI Turn";
		Agent1.place_armies();
		turn_info.innerHTML = "attack";
		Agent1.attack();
		turn = 2;
			
	} else {// turn = 2
		player_name.innerHTML = "player " + turn;
		turn_info_msg.innerHTML = "AI Turn";
		turn_info.innerHTML = "place armies";
		Agent2.place_armies();
		turn_info.innerHTML = "attack";
		Agent2.attack();
		player_name.innerHTML = "player " + turn;
		turn = 1;
	}
	/**
	 check if Game Over
	  then set end = 1
	 */
 }
}
initializeGame();