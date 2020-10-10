var express = require('express');
var app = express();
var http = require('http').createServer();
var io = require('socket.io')(http);
var gameModule = require('./game');
var bodyParser = require('body-parser');
const port = 9000;

var games = [];

var jsonParser = bodyParser.json();

io.on('connection', (socket) => {
    console.log(`a user connected. ${socket.query.handshake}`);
});

app.get('/api/list', jsonParser, (request, response) => {
    response.status(200);
    response.json(JSON.stringify(games));
    response.send();
})

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
    response.json(JSON.stringify(game));
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

    if (games[index].started) {
        response.statusMessage = 'ERR_GAME_ALREADY_STARTED';
        response.status(400);
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