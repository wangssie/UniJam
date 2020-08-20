var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

app.use(express.static("public"));

router.get("/", function(request, response){

    response.sendFile("/public/front.html", { root: __dirname});

});

app.use('/', router);

app.listen(3000, function(){
    console.log("listening...");

});