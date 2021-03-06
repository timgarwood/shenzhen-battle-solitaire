var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var gameModule = require('./game');
var bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 9000;

var games = [];

var jsonParser = bodyParser.json();

io.on('connection', (socket) => {
    socket.emit('solitaire.game.list', games);

    let index = games.findIndex(g => g.name === socket.handshake.query.gameName);
    let gameName = socket.handshake.query.gameName;
    let username = socket.handshake.query.username;
    if (index >= 0) {
        console.log(`user ${socket.handshake.query.username} connected to game ${socket.handshake.query.gameName}`);

        socket.join(games[index].name);

        games[index].addUser(username);

        var joinedMessage = {
            sender: 'System',
            timestamp: new Date(Date.now()).toUTCString(),
            messageBody: `${username} joined.`
        };

        io.sockets.in(games[index].name)
            .emit('solitaire.game.chat', joinedMessage);
    }

    socket.on('disconnect', (reason) => {
        console.log(`disconnect occurred - ${reason}`);

        // remove the user from the game if they initiated a disconnect event
        // by calling socket.disconnect()
        if (reason === 'client namespace disconnect' ||
            reason === 'transport error') {
            if (index >= 0) {
                console.log(`${username} disconnected`);
                games[index].removeUser(username);

                if (games[index].empty()) {
                    games[index].delete();
                    games.splice(index, 1);
                } else {
                    let userLeftMessage = {
                        sender: 'System',
                        timestamp: new Date(Date.now()).toUTCString(),
                        messageBody: `${username} left the game.`
                    }
                    io.sockets
                        .in(gameName)
                        .emit('solitaire.game.chat', userLeftMessage);
                }
            }
        }
    });

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
            .emit('solitaire.game.usersSolved', { users });
    }
}

app.get('/api/game', jsonParser, (request, response) => {
    return response.status(200)
        .send(games);
})

app.post('/api/game', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.body.gameName);
    if (index >= 0) {
        return response.status(400)
            .send({ err: 'ERR_GAME_EXISTS' });
    }

    let game = new gameModule.Game(request.body.username, request.body.gameName);
    games.push(game);

    io.emit('solitaire.game.list', games);

    response.json(JSON.stringify(game));
});

app.delete('/api/game', jsonParser, (request, response) => {
    let index = games.findIndex(x => x.name === request.query.gameName);
    if (index < 0) {
        return response.status(400)
            .send({ err: 'ERR_GAME_NOT_FOUND' });
    }

    let gameName = games[index].name

    games[index].delete();

    games.splice(index, 1);

    io.sockets
        .in(gameName)
        .emit('solitaire.game.deleted');

    io.emit('solitaire.game.list', games);

    return response.status(200)
        .send();
});

app.use(express.json());

//if (process.env.NODE_ENV === 'production') {
// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
//}

server.listen(port, () => {
    console.log(`app now listening on ${port}`);
})