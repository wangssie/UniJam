//imports 
const Player = require('./player');
const GameDatabase = require('./GameDatabase');

// displays the ending page with players scores and option to play again
function gameEnd() {
    // ***display scores of players 
    // ***displayer name of winner 
    
    // EVENT LISTENER *** play again, evoke restart()
}

// restart game state so that same players can re-play the game
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

// completely clear memory of game so that new players can play game
function clearGame() {
    GameDatabase.players = [];
    GameDatabase.wordsUsed = [];
    GameDatabase.currentPlayersList = [];
    GameDatabase.roundsPlayed = 0;
    GameDatabase.currentPlayer = 0; 
    GameDatabase.lastWord = '';
}

module.exports = {
    restart: restart,

    gameEnd: gameEnd,

};