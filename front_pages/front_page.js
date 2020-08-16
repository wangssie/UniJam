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
var opacity_game = 0;
var opacity_def = 0;
var opacity_subdef = 0;
var opacity_instruction = 0;
var opacity_joined = 0;
var opacity_play = 0;
var opacity_input = 0;
var intervalID = 0;

function interval(){
    intervalID = setInterval(fade_in, 70);

}

function fade_in(){
    var title = document.getElementById("title");
    var subtitle = document.getElementById("btm-title");
    var game = document.getElementById("game");
    var definition = document.getElementById("definition");
    var definition_sub = document.getElementById("definition-sub");
    var instruction = document.getElementById("instruction");
    var joined = document.getElementById("joined");
    var play = document.getElementById("play");
    var input = document.querySelector(".player-input")

    opacity_title = Number(window.getComputedStyle(title).getPropertyValue("opacity"));
    opacity_sub = Number(window.getComputedStyle(subtitle).getPropertyValue("opacity"));
    opacity_game = Number(window.getComputedStyle(game).getPropertyValue("opacity"));
    opacity_def = Number(window.getComputedStyle(definition).getPropertyValue("opacity"));
    opacity_subdef = Number(window.getComputedStyle(definition_sub).getPropertyValue("opacity"));
    opacity_instruction = Number(window.getComputedStyle(instruction).getPropertyValue("opacity"));
    opacity_joined = Number(window.getComputedStyle(joined).getPropertyValue("opacity"));
    opacity_play = Number(window.getComputedStyle(play).getPropertyValue("opacity"));
    opacity_input = Number(window.getComputedStyle(input).getPropertyValue("opacity"));

    if (opacity_title < 1){
        opacity_title += 0.03;
        opacity_sub += 0.03;
        opacity_game += 0.03;
        opacity_def += 0.03;
        opacity_subdef += 0.03;
        opacity_instruction += 0.03;
        opacity_joined += 0.03;
        opacity_play += 0.03;
        opacity_input += 0.03;

        title.style.opacity = opacity_title;
        subtitle.style.opacity = opacity_sub;
        game.style.opacity = opacity_game;
        definition.style.opacity = opacity_def;
        definition_sub.style.opacity = opacity_subdef;
        instruction.style.opacity = opacity_instruction;
        joined.style.opacity = opacity_joined;
        play.style.opacity = opacity_play;
        input.style.opacity = opacity_input;

    }
    else{
        clearInterval(intervalID);
    }
}

interval();