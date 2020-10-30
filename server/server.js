var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gameModule = require('./game');
var bodyParser = require('body-parser');
const port = 9000;

var games = [];

var jsonParser = bodyParser.json();

io.on('connection', (socket) => {
    socket.emit('solitaire.game.list', games);

    let index = games.findIndex(g => g.name === socket.handshake.query.gameName);
    if (index >= 0) {
        socket.join(games[index].name);

        games[index].addUser(socket.handshake.query.username);

        var message = {
            sender: 'System',
            timestamp: new Date(Date.now()).toUTCString(),
            messageBody: `${socket.handshake.query.username} joined.`
        };

        io.sockets.in(games[index].name)
            .emit('solitaire.game.chat', message);
    }

    socket.on('solitaire.game.chat', (message) => {
        io.sockets
            .in(message.gameName)
            .emit('solitaire.game.chat', message);
    });

    socket.on('solitaire.game.solved', (message) => {
        handleGameSolved(message);
    });

    socket.on('solitaire.game.start', (message) => {
        handleGameStart(message);
    });
});

handleGameStart = (message) => {
    let index = games.findIndex(x => x.name === message.gameName);
    if (index >= 0) {

        let delayMs = 3000;
        let startingMessage = {
            gameName: message.gameName,
            delay: parseInt(delayMs / 1000)
        };

        io.sockets
            .in(message.gameName)
            .emit('solitaire.game.starting', startingMessage);

        let chatMessage = {
            sender: 'System',
            timestamp: new Date(Date.now()).toUTCString(),
            messageBody: `Game will start in ${startingMessage.delay} seconds...`
        };

        io.sockets
            .in(message.gameName)
            .emit('solitaire.game.chat', chatMessage);


        setTimeout(() => {
            let now = Date.now();

            games[index].start(now);

            let startedMessage = {
                game: games[index]
            }

            io.sockets
                .in(message.gameName)
                .emit('solitaire.game.started', startedMessage);
        }, delayMs);
    }
}

handleGameSolved = (message) => {
    let index = games.findIndex(g => g.name === message.gameName);
    if (index >= 0) {
        games[index].solved(message.username);

        let users = games[index].completedUsers();

        io.sockets
            .in(games[index].name)
            .emit('solitaire.game.usersSolved', users);
    }
}

app.get('/api/game', jsonParser, (request, response) => {
    response.status(200);
    response.json(JSON.stringify(games));
    response.send();
})

app.post('/api/game', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.body.gameName);
    if (index >= 0) {
        response.statusMessage = 'ERR_GAME_EXISTS';
        response.status(400);
        response.send();
        return;
    }

    let game = new gameModule.Game(request.body.username, request.body.gameName);
    games.push(game);

    io.emit('solitaire.game.list', games);

    response.json(JSON.stringify(game));
});

app.delete('/api/game', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.query.gameName);
    if (index < 0) {
        response.statusMessage = 'ERR_GAME_NOT_FOUND';
        response.status(400);
        response.send();
        return;
    }

    let gameName = games[index].name

    games[index].delete();

    games.splice(index, 1);

    io.sockets
        .in(gameName)
        .emit('solitaire.game.deleted');

    io.emit('solitaire.game.list', games);

    response.status(200);
    response.send();
});

app.use(express.json());

server.listen(port, () => {
    console.log(`app now listening on ${port}`);
})