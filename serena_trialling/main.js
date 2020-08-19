// define constants 
let players = []
const maxPlayers = 2;
const Player = require('./player');
const roundTotal = 5;
const Timer = require('easytimer.js').Timer;

// the primary engine of the game 
function main() {
    // part 1: loading screen, waiting for players to input username and start game
    
    // while ***play button not clicked || !enoughPlayers()
        // ***event listener for player creation (aka when input is made)
            // ***event listener triggered function 
            createPlayer();

    
    //part 2: the game 
    for (let i=0; i<=roundTotal; i++) {
        for (let j=0; j<=players.length; j++) {
            startRound();
            checkRound();
            // while ***play button not clicked 
                // do nothing 
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
function startRound() {
    // create timer 
    section1(timer);
    // event listener for when timer is done 
    section2();
}

// page where other players checks if words are valid 
function checkRound() {

}

// displays the ending page with players scores and option to play again
function gameEnd() {

}

main();