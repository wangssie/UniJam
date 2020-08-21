var word_path = [" "];
var allowSubmit = false;
var timerLimit1 =6;
var loadingTime =4;
var breakTime = 4;
var lastWord = ''

function show_start_word(){

    document.getElementById("start-word").innerHTML = start_word
    word_path.push(start_word);

}

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
      console.log(input_word);
      if (word_path[0] == " ") {
        word_path = [];
      }
      word_path.push(input_word);

      document.getElementById("path-container").innerHTML += "<h3 id = 'path-format'>" + input_word + "</h3>";
      console.log(word_path);

      input.value = "";
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
  document.getElementById('next-button').style.opacity=1;
  document.getElementById('next-word-input').style.opacity=1;
  document.getElementById('end').style.opacity=1;
  document.getElementById('end-word').style.opacity=1;
  document.getElementById('start').style.opacity=1;
  document.getElementById('start-word').style.opacity=1;
  document.getElementById('path-container').style.opacity=1;
  document.getElementById('last-word').style.opacity=1;

  document.getElementById('round-start').style.opacity=0;
  
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
      console.log("timer: ", timerLimit1);
      timerLimit1 = timerLimit1 >= 0? timerLimit1:0;
      document.getElementById('timer').innerHTML = ("0"+timerLimit1).slice(-2);
}
  
function breakMoment() {
  closeSubmit();
  clearInterval(timer);
  timer = setInterval(breakTimerDecrease, 1000);
  document.getElementById('timer').innerHTML = " "
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
    console.log("timer: ", timerLimit1);
    document.getElementById('timer').innerHTML = ("0"+timerLimit1).slice(-2);
}

function submitWords() {
  let data = {word_path}
  const options = {
    method: 'POST',
    headers: {
        "Content-type": 'application/json'
    },
    body: JSON.stringify(data)
  };
    fetch('/play', options);
}

startLoading();
console.log()