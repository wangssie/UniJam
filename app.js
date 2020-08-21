var express = require('express');
var path = require('path');
const WordDataBase = require('./public/scripts/WordDatabase');
const GameDataBase = require('./public/scripts/GameDatabase');
const Player = require('./public/scripts/player');
const Check = require('./public/scripts/check');
const End = require('./public/scripts/end');
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
    GameDataBase.players = [new Player('user'), new Player('user yay')]
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
    let netScore = req.body.netScore;
    GameDataBase.players[GameDataBase.currentPlayer].addScore(netScore);
    console.log("player score: ", GameDataBase.players[GameDataBase.currentPlayer].score)
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
    continue_path: cont_href});

    Check.nextRound();

});

app.post("/check", function(req, res){

    GameDataBase.players[GameDataBase.currentPlayer].setScore(req.body.score);
    console.log(GameDataBase.players[GameDataBase.currentPlayer].score);

});

app.get("/end", function(req, res){

    res.render("end", {player1_score: GameDataBase.players[0].score,
    player2_score: GameDataBase.players[1].score,
    player1_name: GameDataBase.players[0].username,
    player2_name: GameDataBase.players[1].username});

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

app.listen(3000, function(){
    console.log("listening...");

});