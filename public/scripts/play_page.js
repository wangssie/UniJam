//timer constants
var loadingTime =4; // length of loading time before round starts
const timerLimit = 16; // section1 time limit 
var timerLimit1 = timerLimit; // timer integer variable for section 1 
var breakTime = 4;  // length of break before section 2 starts
// submit
var allowSubmit = false; // allow player to submit word 
// word path
var word_path = [];  // the players word chain
var endWord = '' // the end word for section 2
var lastWordIndex=-1; // the index of the last word submitted in section 1
// section 
var atSection1 = true; // if user is current playing section 1 or section 2
// user 
var playerTotalScore = Number(document.getElementById('score').getAttribute('data-set')); // players overall total score in game
var playerScore = 0; // players score for THIS round
var penalty=0;  // players penalty for this round

// input box for submitting words
var input = document.getElementById("next-word-input");

// listens for when enter from input box is pressed 
input.addEventListener("keyup", function(event) {

    if (event.keyCode === 13) {
      event.preventDefault();
      // if not empty space, allow user to submit
      if (input.value.trim()!="") {
        document.getElementById("submit").click();
      }
    }
  });

  // add word in input box to word list 
function add_to_path(){
  // if submission is allowed
    if (allowSubmit) {
      let input_word = input.value;

      if (!word_path.map((e)=>e.toLowerCase()).includes(input_word.toLowerCase())){
        word_path.push(input_word);
        document.getElementById("caution-same").innerText = "";  
        
        if (atSection1) {
          lastWordIndex++;
          changeSection1Inputs();
          addScore();  
        }
        else {
          changeSection2Inputs();
        }
      }
      else{
        document.getElementById("caution-same").innerText = "Can't enter existing word!";     
      }
    
      document.getElementById("next-word-input").value = "";
    }

}

function changeSection1Inputs() {
  if (lastWordIndex-2<0){
    document.getElementById('section1-input-1').innerText = " ";
    document.getElementById('section1-input-1').style.opacity = 0;
  }
  else{
    document.getElementById('section1-input-1').innerText = word_path[lastWordIndex-2];
    document.getElementById('section1-input-1').style.opacity = 1;
  }

  if (lastWordIndex-1<0){
    document.getElementById('section1-input-2').innerText = " ";
    document.getElementById('section1-input-2').style.opacity = 0;
  }
  else{
    document.getElementById('section1-input-2').innerText = word_path[lastWordIndex-1];
    document.getElementById('section1-input-2').style.opacity = 1;
  }

  if (lastWordIndex<0){
    document.getElementById('section1-input-3').innerText = " ";
    document.getElementById('section1-input-3').style.opacity = 0;
  }
  else{
    document.getElementById('section1-input-3').innerText = word_path[lastWordIndex];
    document.getElementById('section1-input-3').style.opacity = 1;
  }
}

function changeSection2Inputs() {

  if (word_path.length-3<=lastWordIndex){
    document.getElementById('section2-input-1').innerText = " ";
    document.getElementById('section2-input-1').style.opacity = 0;
  }
  else{
    document.getElementById('section2-input-1').innerText = word_path[word_path.length-3];
    document.getElementById('section2-input-1').style.opacity = 1;
  }

  if (word_path.length-2<=lastWordIndex){
    document.getElementById('section2-input-2').innerText = " ";
    document.getElementById('section2-input-2').style.opacity = 0;
  }
  else{
    document.getElementById('section2-input-2').innerText = word_path[word_path.length-2];
    document.getElementById('section2-input-2').style.opacity = 1;
  }

  if (word_path.length-1<=lastWordIndex){
    document.getElementById('section2-input-3').innerText = " ";
    document.getElementById('section2-input-3').style.opacity = 0;
  }
  else{
    document.getElementById('section2-input-3').innerText = word_path[word_path.length-1];
    document.getElementById('section2-input-3').style.opacity = 1;
  }

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
  document.getElementById('next-word-input').style.opacity=1;
  document.getElementById('end').style.opacity=1;
  document.getElementById('end-word').style.opacity=1;
  document.getElementById('start').style.opacity=1;
  document.getElementById('start-word').style.opacity=1;
  document.getElementById('last-word').style.opacity=1;
  document.getElementById('score').style.opacity=1;

  /*var sect1 = document.getElementsByClassName('section1-inputs');
  for(let i=0; i<sect1.length; i++) {
    sect1[i].style.opacity = 1;
  }
  var sect2 = document.getElementsByClassName('section2-inputs');
  for(let i=0; i<sect2.length;i++) {
    sect2[i].style.opacity = 1;
  }*/

  document.getElementById('round-start').style.opacity=0;
  document.getElementById('playing-start').style.opacity=0;
  
}
var timer;

function startLoading() {
  endWord = document.getElementById('end-word').innerText;
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
  atSection1 = false;
  var text = (word_path.length==0)?"You did not input any words":"Your last word: "+word_path[lastWordIndex];
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
    document.getElementById('next-button').style.opacity=1;
    document.getElementById('end-word').innerText = endWord;
    document.getElementById("last-word").style.opacity = 0;
    document.getElementById("end-word").style.opacity = 1;
    timer = setInterval(timerIncrease, 1000) 
}

function timerIncrease() {
    timerLimit1++;
    if (timerLimit1%4==0 && penalty<playerScore) {
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


// BUTTONS FOR THE WORD CHAIN, LISTENING FOR DELETION (occrs on click)

// triggered when word is clicked to be deleted 
function deleteWord(but_id) {

  console.log(but_id);
  // occurs during section 1
  if (atSection1) {
    // get the content from the button being pressed
    var button = document.getElementById(but_id);
    // if button is empty, no word to delete
    if (button.innerHTML !== ""){
      // delete relevant word from word path array
      let index = word_path.indexOf(button.innerHTML);
      console.log(index);
      word_path.splice(index,1);
      // reduce last word in section1 index
      lastWordIndex--;
      // player score decreases due to deletion and show new score
      playerScore--;
      showScore();
      // update words on button
      changeSection1Inputs();
    }
  }
  // occurs during section 2
  else {
    // get the content from the button being pressed
    var button = document.getElementById(but_id);
    console.log(button.innerHTML.split("-")[0]);
    if (but_id.split("-")[0] == "section2"){
      // if button is empty, no word to delete
      if (button.innerHTML !== ""){
        // delete relevant word from worth path array
        let index = word_path.indexOf(button.innerHTML);
        word_path.splice(index,1);
        // update words on button
        changeSection2Inputs();
      }
    }
  }
}

startLoading();