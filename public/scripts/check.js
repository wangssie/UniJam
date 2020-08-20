const GameDatabase = require('./GameDatabase');
const Player = require('./player');


// page where other players checks if words are valid 
function checkRound() {
    GameDatabase.currentPlayersList.push(GameDatabase.lastWord); // add to player's current list of words
    // event listener *** for adding invalid words, evoke invalidWord()
    // event listener *** when done is clicked: nextRound() evoked
}

// evoked when player determines word in chain is invalid
function invalidWord() {
    // *** crosses off word 
    GameDatabase.players[GameDatabase.currentPlayer].removeScore(); // *** update changes score 
}

// evoked once checking stage is complete
function nextRound() {
    
    GameDatabase.currentPlayersList = []; // clear list of current player's words
    GameDatabase.roundsPlayed+=GameDatabase.currentPlayer; // will +1 once second player was last to play
    GameDatabase.currentPlayer = (GameDatabase.currentPlayer+1)%GameDatabase.players.length; // change player 
    GameDatabase.lastWord = '';
    // *** EVOKE NEXT PLAY HTML
}


checkRound();

//debugging
/*
GameDatabase.players = [new Player('swag')]
nextRound();
invalidWord();
*/