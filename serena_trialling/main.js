// define constants 
let players = []
const maxPlayers = 2;
const Player = require('./player');

// the primary engine of the game 
function main() {
    // part 1: loading screen, waiting for players to input username and start game
    
    // while ***play button not clicked || !enoughPlayers()
        // ***event listener for player creation (aka when input is made)
            // ***event listener triggered function 
            createPlayer();

    
    //part 2: the game 
    


    

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

function enoughPlayers() {
    if (players.length === maxPlayers) {
        return true;
    }
    else {
        return false;
    }
}

main();