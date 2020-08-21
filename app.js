var express = require('express');
var path = require('path');
var app = express();

app.use(express.static("public"));

app.set("view engine", 'ejs');


app.get("/", function(req, res){

    res.render("front", { root: __dirname});

});

app.get("/play", function(req, res){

    res.render("play", { root: __dirname});

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