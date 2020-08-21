var word_path = [];
var allowSubmit = false;
var timerLimit1 =16;

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


// 5 section countdown for the round to begin 
var timer = setInterval(timerDecrease, 5000);

// starting word is shown, submission is available 


var timer = setInterval(timerDecrease, 1000);
    
function timerDecrease() {
      timerLimit1--;
      document.getElementById('timer').innerHTML = ("0"+timerLimit1).slice(-2);
  }
  var timer_stop = setTimeout(cancelTimer, timerLimit1*1000);
  function cancelTimer() {
      clearInterval(timer);
      // trigger function that stops submission option
      setTimeout(section2, 5000)
      document.getElementById('timer').innerHTML = "GET READY FOR PART 2"
      closeSubmit();
  }
  
  function section2() {
      timer = setInterval(timerIncrease, 1000) 
      openSubmit();
  }
  function timerIncrease() {
      timerLimit1++;
      document.getElementById('timer').innerHTML = ("0"+timerLimit1).slice(-2);
  }