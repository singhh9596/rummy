var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/cards',function(req, res){
    var cards = rummy.prepareDeck(req.query);
    res.end(JSON.stringify(cards));
});

app.get("/shuffleTypes",function(req,res){
    var names = [];
    for(var shuffleType in rummy.ShuffleType) {
        if(typeof rummy.ShuffleType[shuffleType] === 'number'){
            names.push(shuffleType);
        }
    }
    res.end(JSON.stringify(names));
});

app.get("/shuffledCards",function(req,res){
    var requestedShuffleType = rummy.ShuffleType[req.query.shuffleType];
    var deck = JSON.parse(req.query.deck);
    var shuffledCards = rummy.shuffle(deck,requestedShuffleType);
    res.end(JSON.stringify(shuffledCards));
});

app.listen(5698);

console.log("App started at:",5698);