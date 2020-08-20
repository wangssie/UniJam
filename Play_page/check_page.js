var word_link_arr = ["Gautam", "gay", "spongebob", "pineapple", "apple", "serena"];
var i = 0;

function display_word_link(){

    for (i = 0; i < word_link_arr.length; i++){
        
        document.getElementById("word-list").innerHTML += "<li id =" + '"' + word_link_arr[i] + '"' + ">"+ word_link_arr[i] + "</li>";
        
    }

}

function cancel_out_word(word){


    let name = document.getElementById(word).innerHTML;
    if (name != null){
        document.getElementById(word).innerHTML = name + "  ☒";
    }
    else{

        return false;
    }
    

}

display_word_link();

var input = document.getElementById("input-prompt");
console.log(input);

input.addEventListener("keyup", function(event) {
  
    if (event.keyCode === 13) {
      
      event.preventDefault();
      
      document.getElementById("submit").click();
    }
  });

function cancel_word(){
    
    let name = document.getElementById("input-prompt").value;

    if (word_link_arr.includes(name)){
        cancel_out_word(name);

    }
    else{
        document.getElementById("caution").innerHTML = "Enter a word in the list!";
    }

    document.getElementById("input-prompt").value = "";

}
