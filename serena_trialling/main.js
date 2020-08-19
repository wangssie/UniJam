// imports
const Timer = require('easytimer.js').Timer;
const WordDatabase = require('./WordDatabase');
const Player = require('./player');
const addScore = require('./player').addScore;
// game constants  
const maxPlayers = 2;
const roundTotal = 5;
const section1Timelimit = 16;
// global variables 
let players = [];
let wordsUsed = [];
let currentPlayersList = [];
// html constants 


// the primary engine of the game 
function main() {
    // part 1: loading screen, waiting for players to input username and start game
    
    // while ***play button not clicked || !enoughPlayers()
        // ***event listener for player creation (aka when input is made)
            // ***event listener triggered function 
            createPlayer('username1');
            createPlayer('username2');

    
    //part 2: the game 
    for (let i=0; i<=roundTotal; i++) {
        for (let j=0; j<players.length; j++) {
            startRound(players[j]);
            checkRound();
            // while ***play button not clicked 
                // do nothing 
            cleanRound();
        }
    }

    //part 3: the score and ending page 
    gameEnd(); 

}

// function creates players 
function createPlayer(username) {
    if (players.length<maxPlayers) {
        players.push(new Player(username))
        // ***add player name to screen
    }
    else {
        // too many players 
        // *** display error on screen 
    }
}

// checks if enough players have entered before game starts
function enoughPlayers() {
    if (players.length === maxPlayers) {
        return true;
    }
    else {
        return false;
    }
}

// displays playing page 
function startRound(player) {
    var timer = new Timer();
    timer.start({startValues: [0, section1Timelimit, 0, 0, 0], target: [0,0,0,0,0], countdown : true})
    section1(player);
    timer.addEventListener('secondsUpdated', displaySeconds())
    // section2 begins when timer is done
    timer.addEventListener('stopped', section2(player));
}

function section1(player) { 
    // CHANGE
    // when input is made, add to array
    var word;
    currentPlayersList.push(word);
    player.addScore();

}

// changes the seconds on the html 
function displaySeconds() {}

function section2(player) {

}

// page where other players checks if words are valid 
function checkRound() {

}

// cleans the variables to get ready for next players round
function cleanRound() {
    
}

// displays the ending page with players scores and option to play again
function gameEnd() {

}

main();
