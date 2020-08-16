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

var opacity_title = 0;
var opacity_sub = 0;
var intervalID = 0;

function interval(){
    intervalID = setInterval(fade_in, 70);

}

function fade_in(){
    var title = document.getElementById("title");
    var subtitle = document.getElementById("btm-title");

    opacity_title = Number(window.getComputedStyle(title).getPropertyValue("opacity"));
    opacity_sub = Number(window.getComputedStyle(subtitle).getPropertyValue("opacity"));

    if (opacity_title < 1){
        opacity_title += 0.03;
        opacity_sub += 0.03;
        title.style.opacity = opacity_title;
        subtitle.style.opacity = opacity_sub;

    }
    else{
        clearInterval(intervalID);
    }
}

interval();