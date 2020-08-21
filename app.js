var express = require('express');
var path = require('path');
const WordDataBase = require('./public/scripts/WordDatabase');
const GameDataBase = require('./public/scripts/GameDatabase');
const Player = require('./public/scripts/player');
const End = require('./public/scripts/end');
const Timer = require('easytimer.js').Timer;
var app = express();
var timer = new Timer();

app.use(express.json({limit: '1mb'}));

app.use(express.static("public"));

app.set("view engine", 'ejs');

app.get("/", function(req, res){

    res.render("front");
    End.restart();
    // ensure timer is stopped when game is cleared 
    timer.stop();

});

app.post("/", function(req, res){

    console.log(req.body.joined_list);
    GameDataBase.players.push(new Player(req.body.joined_list[req.body.joined_list.length - 1]));       

});

app.get("/play", function(req, res){

    var word1; 
    do {word1= WordDataBase.getRandomWord()} while (GameDataBase.wordsUsed.includes(word1))
    var word2;
    do {word2= WordDataBase.getRandomWord()} while (GameDataBase.wordsUsed.includes(word2))
    
    res.render("play", {word1: word1, word2: 'TBD'});

    GameDataBase.players.forEach(element => {
        console.log(element.username);

    });

    // create timer for section1
    timer = new Timer();
    //GameDataBase.section1Timelimit+1
    timer.start({startValues: [0,4,0,0,0], target: [0,0,0,0,0], 
        countdown : true, callback: (t)=>console.log(t.getTotalTimeValues()['seconds'])})
    timer.addEventListener('stopped', (t)=>res.render("play",{word1: word1, word2: word2} ))

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