//timer constants
const timerLimit = 5;
var timerLimit1 = timerLimit;
var loadingTime =4;
var breakTime = 4;
// submit
var allowSubmit = false;
// word path
var word_path = [" "];
var lastWord = ''
var lastWordIndex;
// section 
var atSection1 = true;
// user 
var playerTotalScore = Number(document.getElementById('score').getAttribute('data-set'));
var playerScore = 0;
var penalty=0;

var input = document.getElementById("next-word-input");

input.addEventListener("keyup", function(event) {
  
    if (event.keyCode === 13) {
      
      event.preventDefault();
      
      document.getElementById("submit").click();
    }
  });

function add_to_path(){

    if (allowSubmit) {
      let input_word = input.value;
      if (word_path[0] == " ") {
        word_path = [];
      }
      word_path.push(input_word);
      addScore();
      
      if (atSection1) {
        changeSection1Inputs();
      }
      else {
        changeSection2Inputs();
      }
      document.getElementById("next-word-input").value = "";
    }

}

function changeSection1Inputs() {
  document.getElementById('section1-input-1').innerText = (word_path.length-2<=0)?" ":word_path[word_path.length-3];
  document.getElementById('section1-input-2').innerText = (word_path.length-1<=0)?" ":word_path[word_path.length-2];
  document.getElementById('section1-input-3').innerText = word_path[word_path.length-1]
}

function changeSection2Inputs() {
  document.getElementById('section2-input-1').innerText = (word_path.length-3<=lastWordIndex)?" ":word_path[word_path.length-3];
  document.getElementById('section2-input-2').innerText = (word_path.length-2<=lastWordIndex)?" ":word_path[word_path.length-2];
  document.getElementById('section2-input-3').innerText = (word_path.length-1==lastWordIndex)?" ":word_path[word_path.length-1];
}

// not allow any submissions to the word chain
function closeSubmit() {
  allowSubmit = false;
}

// allow submissions to the word chain
function openSubmit() {
  allowSubmit = true;
}


// starting word is shown, submission is available 
function makeVisible() {
  document.getElementById('game').style.opacity=1;
  document.getElementById('round-count').style.opacity=1;
  document.getElementById('timer').style.opacity=1;
  document.getElementById('player-name').style.opacity=1;
  document.getElementById('btm-title').style.opacity=1;
  document.getElementById('path-text').style.opacity=1;
  document.getElementById('next').style.opacity=1;
  document.getElementById('next-button').style.opacity=1;
  document.getElementById('next-word-input').style.opacity=1;
  document.getElementById('end').style.opacity=1;
  document.getElementById('end-word').style.opacity=1;
  document.getElementById('start').style.opacity=1;
  document.getElementById('start-word').style.opacity=1;
  document.getElementById('last-word').style.opacity=1;
  document.getElementById('score').style.opacity=1;

  document.getElementById('round-start').style.opacity=0;
  document.getElementById('playing-start').style.opacity=0;
  
}
var timer;

function startLoading() {
  lastWord = document.getElementById('end-word').innerText;
  document.getElementById('end-word').innerText = '-';
  const timeStop = loadingTime;
  timer = setInterval(loadingTimerDecrease, 1000);
  var timer_stop = setTimeout(startSection1, timeStop*1000);
}

function startSection1() {
  clearInterval(timer);
  makeVisible();
  openSubmit();
  const timeStop = timerLimit1;
  timer = setInterval(timerDecrease, 1000);
  var timer_stop = setTimeout(breakMoment, timeStop*1000);
}

function loadingTimerDecrease() {
  loadingTime--;
  document.getElementById('round-start').innerHTML = "Round begins in "+loadingTime;
}
    
function timerDecrease() {
      timerLimit1--;
      timerLimit1 = timerLimit1 >= 0? timerLimit1:0;
      document.getElementById('timer').innerHTML = ("0"+timerLimit1).slice(-2);
}
  
function breakMoment() {
  closeSubmit();
  clearInterval(timer);
  timer = setInterval(breakTimerDecrease, 1000);
  document.getElementById('timer').innerHTML = " ";
  lastWordIndex = (word_path[0]==" ")?0:word_path.length-1;
  atSection1 = false;
  var text = (word_path[0]==" ")?"You did not input any words":"Your last word: "+word_path[word_path.length-1];
  document.getElementById("last-word").innerHTML = text;
  var timer_stop = setTimeout(section2, breakTime*1000);
}

function breakTimerDecrease() {
  breakTime--;
  document.getElementById('end-word').innerText = breakTime;
}

function section2() {
    openSubmit();
    clearInterval(timer);
    document.getElementById('end-word').innerText = lastWord;
    document.getElementById("last-word").style.opacity = 0;
    document.getElementById("end-word").style.opacity = 1;
    timer = setInterval(timerIncrease, 1000) 
}

function timerIncrease() {
    timerLimit1++;
    if (timerLimit1%2==0 && penalty<timerLimit-1) {
      penalty++;
      showScore();
    }
    document.getElementById('timer').innerHTML = ("0"+timerLimit1).slice(-2);
}

function submitWords() {
  let netScore = Number(playerScore) - Number(penalty);
  let data = {word_path, netScore}
  const options = {
    method: 'POST',
    headers: {
        "Content-type": 'application/json'
    },
    body: JSON.stringify(data)
  };


    fetch('/play', options);
}

function addScore() {
  playerScore++;
  showScore();
}

function showScore() {
  document.getElementById('score').innerHTML = `score{${playerScore}}-penalty{${penalty}}`;
}

startLoading();