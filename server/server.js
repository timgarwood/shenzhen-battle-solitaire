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

    // check for a 'room' with the name of the game they are joining
    let gameName = socket.handshake.query.gameName;
    if (gameName) {
        socket.join(gameName);

        var message = {
            sender: 'System',
            timestamp: new Date(Date.now()).toUTCString(),
            messageBody: `${socket.handshake.query.username} joined.`
        };

        io.sockets.in(gameName)
            .emit('solitaire.game.chat', message);
    }

    socket.on('solitaire.game.chat', (message) => {
        io.sockets
            .in(message.gameName)
            .emit('solitaire.game.chat', message);
    });

    socket.on('solitaire.game.start', (message) => {
        let index = games.findIndex(x => x.name === message.gameName);
        if (index >= 0) {
            games[index].start();

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

            let startedMessage = {
                game: games[index]
            }

            setTimeout(() => {
                io.sockets
                    .in(message.gameName)
                    .emit('solitaire.game.started', startedMessage);
            }, delayMs);
        }
    });
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

    let game = new gameModule.Game(request.body.username, request.body.gameName);
    games.push(game);

    io.emit('solitaire.game.list', games);

    response.json(JSON.stringify(game));
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

server.listen(port, () => {
    console.log(`app now listening on ${port}`);
})