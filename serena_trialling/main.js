// imports
const Timer = require('easytimer.js').Timer;
const WordDatabase = require('./WordDatabase');
const Player = require('./player');
const addScore = require('./player').addScore;
// game constants  
const maxPlayers = 2;
const roundTotal = 5;
const section1Timelimit = 15;
// global variables 
let players = [];
let wordsUsed = [];
let currentPlayersList = [];
let roundsPlayed = 0;
let currentPlayer = 0;
// html constants 


// the primary engine of the game 
function main() {
    // EVENT LISTENER: on submission of username, evoke createPlayer()
    // EVENT LISTENER: on click of start, evoke function checkStart()
}

// will start game if enough players exist
function checkStart() {
    if(players.length===maxPlayers) {
        startRound();
    }
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

// displays playing page 
function startRound(player) {
    // rounds played reached total rounds
    if (roundsPlayed===roundTotal) {
        gameEnd();
    }
    // begin section 1 for current player 
    else {
        section1(players[currentPlayer]);
    }
}

function section1(player) { 
    var word;
    // get word for section that hasn't been used before 
    do {word=WordDatabase.getRandomWord()} while (wordsUsed.includes(word))
    wordsUsed.push(word); // add to used words
    currentPlayersList.push(word);  // add to current player's list of words 
    // *** Put word onto html 

    let timer = new Timer();

    timer.start({startValues: [0,3,0,0,0], target: [0,0,0,0,0], countdown:true, callback: displaySeconds});
    
    // *** EVENT LISTENER: if word is inputted, evoke addWordToCurrentList(word, player)
    
    // Go to section 2 once timer has finished 
    timer.addEventListener('stopped', section2(player))
    

}

// add inputted word into current players current list of words
function addWordToCurrentList(word, player) {
    currentPlayersList.push(word);
    player.addScore(); // increase score by 1 when player adds a word
}

// *** changes the seconds on the html 
function displaySeconds(timer) {
    console.log(timer.getTotalTimeValues()['seconds']);
}

function section2(player) {
    var word;
    // get word for section that hasn't been used before 
    do {word=WordDatabase.getRandomWord()} while (wordsUsed.includes(word))
    wordsUsed.push(word); // add to used words
    
    let timer = new Timer();
    let endTime = 0;
    timer.start({target:[0,section1Timelimit*2,0,0,0], callback:(t)=>changeEndTime(t)})

    // deduct score from player every 2 seconds that passes
    function changeEndTime(timer) {
        endTime = timer.getTotalTimeValues()['seconds'];
        if (endtime%2===0) {
            player.removeScore();
        }
    }

    // EVENTLISTENER: ***when submit is made, evoke checkRound(word)     

}

// page where other players checks if words are valid 
function checkRound() {
    currentPlayersList.push(word); // add to player's current list of words

    // event listener *** for adding words
    // event listener *** when done is clicked: nextRound() evoked
}

function nextRound() {
    currentPlayersList = []; // clear list of current player's words
    roundsPlayed+=currentPlayer; // will +1 once second player was last to play
    currentPlayer = (currentPlayer+1)%players.length; // change player 
    startRound(); 
}

// displays the ending page with players scores and option to play again
function gameEnd() {
    // ***display scores of players 
    // ***displayer name of winner 
    
    // EVENT LISTENER *** play again evoke restart()
}


function restart() {
    // reset the scores for players back to 0
    for (let i=0; i<players.length; i++) {
        players[i].restart()
    }
    currentPlayer = 0;
    // start the game again
    startRound(players[currentPlayer]);
}

main();
