var word_path = [];

var start_word = "somerandomword";

function show_start_word(){

    document.getElementById("start-word").innerHTML = start_word
    word_path.push(start_word);

}

show_start_word();

var input = document.getElementById("next-word-input");

input.addEventListener("keyup", function(event) {
  
    if (event.keyCode === 13) {
      
      event.preventDefault();
      
      document.getElementById("submit").click();
    }
  });

function add_to_path(){

    let input_word = input.value;
    console.log(input_word);
    
    word_path.push(input_word);

    document.getElementById("path-container").innerHTML += "<h3 id = 'path-format'>" + input_word + "</h3>";
    console.log(word_path);

    input.value = "";

}