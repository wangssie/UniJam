(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class GameDatabase {
    static players = [];
    static wordsUsed = [];
    static currentPlayersList = [];
    static roundsPlayed = 0;
    static currentPlayer = 0; 
    static lastWord = '';
}
},{}],2:[function(require,module,exports){
// imports
const Player = require('./player');
const GameDatabase = require('./GameDatabase');

// game constants  
var maxPlayers = 2;
var roundTotal = 5;
var section1Timelimit = 15;
//exports 
module.exports.maxPlayers = maxPlayers;
module.exports.roundTotal = roundTotal;
module.exports.section1Timelimit = section1Timelimit;

// global variables 
/* let players = [];
let wordsUsed = [];
let currentPlayersList = [];
let roundsPlayed = 0;
let currentPlayer = 0; */
// html constants 

var opacity_title = 0;
var opacity_sub = 0;
var opacity_game = 0;
var opacity_def = 0;
var opacity_subdef = 0;
var opacity_instruction = 0;
var opacity_joined = 0;
var opacity_play = 0;
var opacity_input = 0;
var opacity_name = 0;
var opacity_count = 0;
var intervalID = 0;

function interval(){
    intervalID = setInterval(fade_in, 60);

}

function fade_in(){
    
    var subtitle = document.getElementById("btm-title");
    var game = document.getElementById("game");
    var definition = document.getElementById("definition");
    var definition_sub = document.getElementById("definition-sub");
    var instruction = document.getElementById("instruction");
    var joined = document.getElementById("joined");
    var play = document.getElementById("play");
    var input = document.getElementById("input-box");
    var name = document.getElementById("name-prompt");
    var count = document.getElementById("player-count");

    opacity_sub = Number(window.getComputedStyle(subtitle).getPropertyValue("opacity"));
    opacity_game = Number(window.getComputedStyle(game).getPropertyValue("opacity"));
    opacity_def = Number(window.getComputedStyle(definition).getPropertyValue("opacity"));
    opacity_subdef = Number(window.getComputedStyle(definition_sub).getPropertyValue("opacity"));
    opacity_instruction = Number(window.getComputedStyle(instruction).getPropertyValue("opacity"));
    opacity_joined = Number(window.getComputedStyle(joined).getPropertyValue("opacity"));
    opacity_play = Number(window.getComputedStyle(play).getPropertyValue("opacity"));
    opacity_input = Number(window.getComputedStyle(input).getPropertyValue("opacity"));
    opacity_name = Number(window.getComputedStyle(name).getPropertyValue("opacity"));
    opacity_count = Number(window.getComputedStyle(name).getPropertyValue("opacity"));

    if (opacity_sub < 1){
        
        opacity_name += 0.02;
        opacity_sub += 0.02;
        opacity_game += 0.02;
        opacity_def += 0.02;
        opacity_subdef += 0.02;
        opacity_instruction += 0.02;
        opacity_joined += 0.02;
        opacity_play += 0.02;
        opacity_input += 0.02;
        opacity_count += 0.02;

        subtitle.style.opacity = opacity_sub;
        game.style.opacity = opacity_game;
        definition.style.opacity = opacity_def;
        definition_sub.style.opacity = opacity_subdef;
        instruction.style.opacity = opacity_instruction;
        joined.style.opacity = opacity_joined;
        play.style.opacity = opacity_play;
        input.style.opacity = opacity_input;
        name.style.opacity = opacity_name;
        count.style.opacity = opacity_count;

    }
    else{
        clearInterval(intervalID);
    }
}

interval();

// the primary engine of the game 
function main() {
    //var input = document.getElementById("input-box").value;
    // EVENT LISTENER: *** on submission of username, evoke createPlayer()
    // EVENT LISTENER: *** on click of start, evoke function checkStart()
}

// will start game if enough players exist            
function checkStart() {
    if(GameDatabase.players.length===maxPlayers) {
        startRound();
    }
}

// function creates players 
function createPlayer(username) {
    if (GameDatabase.players.length<maxPlayers) {
        GameDatabase.players.push(new Player(username));

        console.log(GameDatabase.players[GameDatabase.players.length - 1].username);
        // ***add player name to screen (done through player_input function)
    }
    // too many players 
    else {
        // *** display error on screen 
    }
}

let input = document.getElementById("input-box");

input.addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    event.preventDefault(); 
    player_input();
  }
});

function player_input(){

    let name = input.value;  //Get name input value
    createPlayer(name);

    document.getElementById("joined-list").innerHTML += "<li id = 'players'>"+ name + "</li>";

    document.getElementById("input-box").value = "";

    console.log("Player name: " + name);
    
    update_player_count();
    
}

function update_player_count(){
    
    document.getElementById("player-count").innerHTML = "Player Count: " + GameDatabase.players.length;

}

// debugging
//checkStart()
//createPlayer('user');



},{"./GameDatabase":1,"./player":3}],3:[function(require,module,exports){
class Player {
    username;
    score;
    constructor(username) {
        this.score = 0;
        this.username = username;
    }

    get score() {
        return this.score;
    }

    get username() {
        return this.username;
    }

    addScore(score=1) {
        this.score+=score;
    }

    removeScore(score=1) {
        this.score -= score;
    }

    restart() {
        this.score = 0;
    }


}
module.exports = Player;
},{}]},{},[2,3,1]);
