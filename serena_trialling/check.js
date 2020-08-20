// page where other players checks if words are valid 
function checkRound() {
    currentPlayersList.push(word); // add to player's current list of words
    // event listener *** for adding invalid words, evoke invalidWord()
    // event listener *** when done is clicked: nextRound() evoked
}

// evoked when player determines word in chain is invalid
function invalidWord() {
    // *** crosses off word 
    players[currentPlayer].removeScore(); // *** update changes score 
}

// evoked once checking stage is complete
function nextRound() {
    currentPlayersList = []; // clear list of current player's words
    roundsPlayed+=currentPlayer; // will +1 once second player was last to play
    currentPlayer = (currentPlayer+1)%players.length; // change player 
    startRound(); 
}