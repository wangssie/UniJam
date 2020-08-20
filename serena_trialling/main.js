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
        GameDatabase.players.push(new Player(username))
        // ***add player name to screen
    }
    // too many players 
    else {
        // *** display error on screen 
    }
}

main();

// debugging
//checkStart()
//createPlayer('user');
