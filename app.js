var express = require('express');
var PORT = process.env.PORT || 3000;
var path = require('path');
const WordDataBase = require('./public/scripts/WordDatabase');
const GameDataBase = require('./public/scripts/GameDatabase');
const Player = require('./public/scripts/player');
const Check = require('./public/scripts/check');
const End = require('./public/scripts/end');
const GameDatabase = require('./public/scripts/GameDatabase');
var app = express();

app.use(express.json({limit: '1mb'}));

app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get("/", function(req, res){

    res.render("front");
    End.clearGame();

});

app.post("/", function(req, res){

    console.log(req.body.joined_list);
    GameDataBase.players.push(new Player(req.body.joined_list[req.body.joined_list.length - 1]));       

});

app.get("/play", function(req, res){
    var word1; 
    do {word1= WordDataBase.getRandomWord()} while (GameDataBase.wordsUsed.includes(word1))
    GameDataBase.currentPlayersList = [word1];
    var word2;
    do {word2= WordDataBase.getRandomWord()} while (GameDataBase.wordsUsed.includes(word2))
    var round = GameDataBase.roundsPlayed + 1;
    let score = GameDataBase.players[GameDataBase.currentPlayer].score;
    GameDataBase.lastWord = word2;
    res.render("play", {
        word1: word1, 
        word2: word2, 
        player_name: GameDataBase.players[GameDataBase.currentPlayer].username,
        round: round,
        score: score});

    GameDataBase.players.forEach(element => {
        console.log(element.username);

    });

});

app.post('/play', function(req, res) {

    req.body.word_path.push(GameDataBase.lastWord);
    GameDataBase.currentPlayersList = GameDataBase.currentPlayersList.concat(req.body.word_path);

    console.log("Player list of words ", GameDataBase.currentPlayersList);

    let netScore = Number(req.body.netScore);
    GameDataBase.players[GameDataBase.currentPlayer].addScore(netScore);
    console.log("Database of players after sending info from play: ",GameDataBase.players);
})

app.get("/Instructions", function(req, res){

    res.render("Instructions", { root: __dirname});

});

app.get("/check", function(req, res){

    let cont_href;

    if (GameDataBase.roundsPlayed == GameDataBase.roundTotal - 1 && GameDataBase.currentPlayer == 1){
        cont_href = "end";
    }
    else{
        cont_href = "play";
    }

    res.render("check", {words: GameDataBase.currentPlayersList,
    player_name: GameDataBase.players[GameDataBase.currentPlayer].username,
    score: GameDataBase.players[GameDataBase.currentPlayer].score,
    continue_path: cont_href,
    round: GameDataBase.roundsPlayed + 1});

    
});

app.post("/check", function(req, res){
    GameDataBase.players[GameDataBase.currentPlayer].setScore(Number(req.body.score));
    Check.nextRound();
});

app.get("/end", function(req, res){

    let player_winner, player_loser;

    if (GameDataBase.players[0].score > GameDataBase.players[1].score){
        player_winner = GameDataBase.players[0].username;
        player_loser = GameDataBase.players[1].username;
    }
    else if (GameDataBase.players[0].score < GameDataBase.players[1].score){
        player_winner = GameDataBase.players[1].username;
        player_loser = GameDataBase.players[0].username;
    }
    else{
        player_winner = "Nobody";
        player_loser = "";
    }

    res.render("end", {player1_score: GameDataBase.players[0].score,
    player2_score: GameDataBase.players[1].score,
    player1_name: GameDataBase.players[0].username,
    player2_name: GameDataBase.players[1].username,
    winner: player_winner,
    loser: player_loser});

});

app.post("/end", function(req, res){

    if (req.body.play_more == true){
        console.log("restarting game!!!");
        End.restart();
    }
    else{
        console.log("resetting game!!!");
        End.clearGame();
    }

});

app.listen(PORT, function(){
    console.log("listening...");

});