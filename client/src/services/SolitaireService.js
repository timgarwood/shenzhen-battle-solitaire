import axios from 'axios';
import socketIOClient from 'socket.io-client'

export default class SolitaireService {

    url = "/api/";
    socketIoUrl = "http://localhost:9000";

    getGamesList(callback) {
        axios.get(this.url + 'list')
            .then(response => {
                callback({
                    error: null,
                    data: JSON.parse(response.data)
                });
            })
            .catch(err => {
                callback({
                    error: err,
                    data: null
                });
            });
    }

    createGame(gameName, callback) {
        var data = {
            gameName: gameName
        };

        axios.post(this.url + 'create', data)
            .then(response => {
                callback({
                    error: null,
                    data: JSON.parse(response.data)
                });
            })
            .catch(err => {
                callback({
                    error: err,
                    data: null
                });
            })
    }

    joinGame(username, gameName) {
        let opts = {
            query: {
                gameName,
                username
            }
        };

        return socketIOClient(this.socketIoUrl, opts);
    }

    connectIo() {
        return socketIOClient(this.socketIoUrl);
    }
}
