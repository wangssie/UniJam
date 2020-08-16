var joined_list = [];

var input = document.getElementById("input-box");

input.addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    
    event.preventDefault();
    
    document.getElementById("submit").click();
  }
});

function player_input(){
    var input = document.getElementById("input-box").value;
  
    joined_list.push(input);

    document.getElementById("joined-list").innerHTML += "<h3 id = 'players'>"+ input + "</h3>";

    document.getElementById("input-box").value = "";

    console.log("Player name: " + input);

    console.log(joined_list);
    
}