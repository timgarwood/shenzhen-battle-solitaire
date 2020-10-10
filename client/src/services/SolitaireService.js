import axios from 'axios';

export default class SolitaireService {

    url = "/api/";

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
}