import axios from 'axios';
import socketIOClient from 'socket.io-client'

export default class SolitaireService {

    url = "/api/game";
    constructor() {
        this.socketIoUrl = window.location.origin;
    }

    getGamesList(callback) {
        axios.get(this.url + '/list')
            .then(response => {
                callback({
                    error: null,
                    data: JSON.parse(response.data)
                });
            })
            .catch(err => {
                let errorMessage = null;
                if (err.response) {
                    errorMessage = err.response.data;
                }
                callback({
                    error: errorMessage,
                    data: null
                });
            });
    }

    createGame(username, gameName, callback) {
        var data = {
            gameName,
            username
        };

        axios.post(this.url, data)
            .then(response => {
                callback({
                    error: null,
                    data: JSON.parse(response.data)
                });
            })
            .catch(err => {
                let errorMessage = null;
                if (err.response) {
                    errorMessage = err.response.data;
                }
                callback({
                    error: errorMessage,
                    data: null
                });
            })
    }

    deleteGame(gameName, callback) {
        axios.delete(this.url, { params: { gameName } })
            .then(response => {
                callback({
                    error: null
                });
            })
            .catch(err => {
                let errorMessage = null;
                if (err.response) {
                    errorMessage = err.response.data;
                }
                callback({
                    error: errorMessage,
                    data: null
                });
            });
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
