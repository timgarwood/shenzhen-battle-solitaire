var express = require('express');
var gameModule = require('./game');
var bodyParser = require('body-parser');
var app = express();
const port = 9000;

var games = [];

var jsonParser = bodyParser.json();

app.post('/api/create', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.body.gameName);
    if (index >= 0) {
        response.statusMessage = 'ERR_GAME_EXISTS';
        response.status(400);
        response.send();
        return;
    }

    let game = new gameModule.Game(request.body.gameName);
    games.push(game);

    //TODO: connect io
    response.status(200);
    response.send();
});

app.post('/api/join', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.body.gameName);
    if (index < 0) {
        response.statusMessage = 'ERR_GAME_NOT_FOUND';
        response.status(404);
        response.send();
        return;
    }

    //TODO: connect io
    response.status(200);
    response.send();
});

app.post('/api/start', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.body.gameName);
    if (index < 0) {
        response.statusMessage = 'ERR_GAME_NOT_FOUND';
        response.status(404);
        response.send();
        return;
    }

    games[index].start();

    // TODO:
    // publish io message
    response.json(JSON.stringify(games[index]));
})

app.use(express.json());

app.listen(port, () => {
    console.log(`app now listening on ${port}`);
})