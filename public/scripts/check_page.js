var word_link_arr = [];

function cancel_out_word(word){

    let name = document.getElementById(word).innerHTML;
    if (name != null){
        document.getElementById(word).innerHTML = name + "  ☒";
    }
    else{

        return false;
    }
    
}

var input = document.getElementById("input-prompt");
console.log(input);

input.addEventListener("keyup", function(event) {
  
    if (event.keyCode === 13) {
      
      event.preventDefault();
      
      document.getElementById("submit").click();
    }
  });


let html_array = Array.from(document.querySelectorAll('#word-list>li'));

for (const li of html_array){
    word_link_arr.push(li.textContent.trim());
}

function cancel_word(){
    
    let name = document.getElementById("input-prompt").value;
    let score = document.getElementById("show-score").innerText.trim().split(" ");
    let relevant = word_link_arr.slice(1, word_link_arr.length-1); // create an array that does not include first and last word
    relevant = relevant.map((e)=>e.toLowerCase()); // make all the elements to lower case
    console.log("relevant array", relevant);

    if (word_link_arr.includes(name.toLowerCase())){ // check if lower case input matches anythign in relevant array
        document.getElementById("caution").innerHTML = "";
        cancel_out_word(name);
        let index = relevant.indexOf(name.toLowerCase)+1; // index in relevant is always shifted to the left by 1
        word_link_arr.splice(index, 1);

        if (score[1] > 0){
            document.getElementById('show-score').innerHTML = "Score: " + (score[1] - 1);
        }

    }
    else{
        document.getElementById("caution").innerHTML = "Enter a word in the list!";
    }

    document.getElementById("input-prompt").value = "";

}

function submit_score(){

    let score = document.getElementById("show-score").innerText.trim().split(" ")[1];
    let data = {score}

    const options = {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('/check', options);

}
