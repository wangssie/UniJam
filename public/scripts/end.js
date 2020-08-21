//imports 
const Player = require('./player');
const GameDatabase = require('./GameDatabase');

// displays the ending page with players scores and option to play again
function gameEnd() {
    // ***display scores of players 
    // ***displayer name of winner 
    
    // EVENT LISTENER *** play again, evoke restart()
}

function restart() {
    var players = GameDatabase.players;
    GameDatabase.roundsPlayed =0;
    // reset the scores for players back to 0
    for (let i=0; i<players.length; i++) {
        GameDatabase.players[i].restart()
    }
    GameDatabase.currentPlayer = 0;
    // start the game again
        //*** HTML to play.js page
}

module.exports = {
    restart: restart,

    gameEnd: gameEnd,

};