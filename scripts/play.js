// imports 
const Timer = require('easytimer.js').Timer;
const addScore = require('./player').addScore;
const WordDatabase = require('./WordDatabase');
const GameDatabase = require('./GameDatabase');
const roundTotal = require('./main').roundTotal;
var section1Timelimit = require('./main').section1Timelimit;
const Player = require('./player');

function startRound() {
    // rounds played reached total rounds
    if (GameDatabase.roundsPlayed===roundTotal) {
        // HTML *** go to end.js file
    }
    // begin section 1 for current player 
    else {
        section1(GameDatabase.players[GameDatabase.currentPlayer]);
    }
}

function section1(player) { 
    var word = getNewWord();
    GameDatabase.currentPlayersList.push(word);  // add to current player's list of words 
    // *** Put word onto html 

    var timer = new Timer();

    timer.start({startValues: [0,section1Timelimit+1,0,0,0], target: [0,0,0,0,0], countdown:true, callback: displaySeconds});
    // *** EVENT LISTENER: if word is inputted, evoke addWordToCurrentList(word, player)
    
    // Go to section 2 once timer has finished 
    timer.addEventListener('stopped', (t)=>section2(player))
    

}

// add inputted word into current players current list of words
function addWordToCurrentList(word, player) {
    GameDatabase.currentPlayersList.push(word);
    player.addScore(); // increase score by 1 when player adds a word
    // *** have player's score linked to html
}


function section2(player) {
    var word = getNewWord();
    GameDatabase.lastWord = word;
    var endTime = 0;
    
    var timer = new Timer();
    timer.start({startValues: [0,0,0,0,0], target:[0,section1Timelimit*2,0,0,0], callback:displaySeconds})
    timer.addEventListener('secondsUpdated', (t)=>changeEndTime(timer))
    
    // deduct score from player every 2 seconds that passes
    function changeEndTime(timer) {
        endTime = timer.getTotalTimeValues()['seconds'];
        if (endTime%2===0) {
            player.removeScore(); // *** update score of current player 
        }
    }

    // EVENTLISTENER: ***when submit is made, go to check.js
}


// *** changes the seconds on the html 
function displaySeconds(timer) {
    console.log(timer.getTotalTimeValues()['seconds']); // just printing to console for now 
}

// get random, not used word from WordDatabase
function getNewWord() {
    var word;
    // get word for section that hasn't been used before 
    do {word=WordDatabase.getRandomWord()} while (GameDatabase.wordsUsed.includes(word))
    GameDatabase.wordsUsed.push(word);
    return word;
}

startRound();

//debug
//var rando = new Player('serena')
//section1(rando);
//addWordToCurrentList('happy', rando);
//section2(rando);