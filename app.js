var express = require('express');
var path = require('path');
const WordDataBase = require('./public/scripts/WordDatabase');
const GameDataBase = require('./public/scripts/GameDatabase');
const Player = require('./public/scripts/player');
const End = require('./public/scripts/end');
var app = express();

app.use(express.json({limit: '1mb'}));

app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get("/", function(req, res){

    res.render("front");
    End.restart();

});

app.post("/", function(req, res){

    console.log(req.body.joined_list);
    GameDataBase.players.push(new Player(req.body.joined_list[req.body.joined_list.length - 1]));       

});

app.get("/play", function(req, res){

    var random_word = WordDataBase.getRandomWord();
    res.render("play", {word: random_word});

    GameDataBase.players.forEach(element => {
        console.log(element.username);

    });

});

app.get("/Instructions", function(req, res){

    res.render("Instructions", { root: __dirname});

});

app.get("/check", function(req, res){

    res.render("check", { root: __dirname});

});

app.listen(3000, function(){
    console.log("listening...");

});