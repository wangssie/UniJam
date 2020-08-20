module.exports = class GameDatabase {
    static players = [];
    static wordsUsed = [];
    static currentPlayersList = [];
    static roundsPlayed = 0;
    static currentPlayer = 0; 
    static lastWord = '';

    static maxPlayers = 2;
    static roundTotal = 5;
    static section1Timelimit = 15; 
}