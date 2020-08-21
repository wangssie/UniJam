var joined_list = [];
var num_players = 0;
const maxPlayers = 2; // hard coded, not good, please change 
var input = document.getElementById("input-box");

input.addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13) {
    
    event.preventDefault();
    // submit input of username ONLY if maxPlayers hasn't been reached
    if (joined_list.length < maxPlayers) {
        document.getElementById("submit").click();
    }
    else {
        // show error message 
        console.log("NO MORE PLAYERS PLEASE")
    }
  }
});

function player_input(){

    var input = document.getElementById("input-box").value;
    joined_list.push(input);

    document.getElementById("joined-list").innerHTML += "<li id = 'players'>"+ input + "</li>";
    document.getElementById("input-box").value = "";

    console.log("Player name: " + input);
    num_players++;
    update_player_count();
    
    console.log(joined_list);
    
    let data = {joined_list};
    const options = {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(data)

    };

    fetch('/', options);
    
}

function update_player_count(){
    
    document.getElementById("player-count").innerHTML = "Player Count: " + num_players;

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
var opacity_name = 0;
var opacity_count = 0;
var intervalID = 0;

function interval(){
    intervalID = setInterval(fade_in, 60);

}


function fade_in(){
    
    var subtitle = document.getElementById("btm-title");
    var game = document.getElementById("game");
    var definition = document.getElementById("definition");
    var definition_sub = document.getElementById("definition-sub");
    var instruction = document.getElementById("instruction");
    var joined = document.getElementById("joined");
    var play = document.getElementById("play");
    var input = document.getElementById("input-box");
    var name = document.getElementById("name-prompt");
    var count = document.getElementById("player-count");

    opacity_sub = Number(window.getComputedStyle(subtitle).getPropertyValue("opacity"));
    opacity_game = Number(window.getComputedStyle(game).getPropertyValue("opacity"));
    opacity_def = Number(window.getComputedStyle(definition).getPropertyValue("opacity"));
    opacity_subdef = Number(window.getComputedStyle(definition_sub).getPropertyValue("opacity"));
    opacity_instruction = Number(window.getComputedStyle(instruction).getPropertyValue("opacity"));
    opacity_joined = Number(window.getComputedStyle(joined).getPropertyValue("opacity"));
    opacity_play = Number(window.getComputedStyle(play).getPropertyValue("opacity"));
    opacity_input = Number(window.getComputedStyle(input).getPropertyValue("opacity"));
    opacity_name = Number(window.getComputedStyle(name).getPropertyValue("opacity"));
    opacity_count = Number(window.getComputedStyle(name).getPropertyValue("opacity"));

    if (opacity_sub < 1){
        
        opacity_name += 0.02;
        opacity_sub += 0.02;
        opacity_game += 0.02;
        opacity_def += 0.02;
        opacity_subdef += 0.02;
        opacity_instruction += 0.02;
        opacity_joined += 0.02;
        opacity_play += 0.02;
        opacity_input += 0.02;
        opacity_count += 0.02;

        subtitle.style.opacity = opacity_sub;
        game.style.opacity = opacity_game;
        definition.style.opacity = opacity_def;
        definition_sub.style.opacity = opacity_subdef;
        instruction.style.opacity = opacity_instruction;
        joined.style.opacity = opacity_joined;
        play.style.opacity = opacity_play;
        input.style.opacity = opacity_input;
        name.style.opacity = opacity_name;
        count.style.opacity = opacity_count;

    }
    else{
        clearInterval(intervalID);
    }
}

interval();
