var cardModule = require('./card');

class Game {
    constructor(createdBy, name) {
        this.name = name;
        this.createdBy = createdBy;
        this.started = false;
        this.users = [];
    }

    delete() {

    }

    addUser(username) {
        this.users.push({
            username: username,
            startTime: null,
            endTime: null
        });
    }

    removeUser(username) {
        let index = this.users.findIndex(u => u.username === username);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }

    empty() {
        return this.users.length <= 0;
    }

    start(now) {
        let cards = [];

        this.users.forEach(u => {
            u.startTime = now;
            u.endTime = null;
        });

        // generate the number cards
        for (let i = 1; i <= 9; ++i) {
            cards.push(new cardModule.Card('R', i));
            cards.push(new cardModule.Card('G', i));
            cards.push(new cardModule.Card('B', i));
        }

        // generate the dragon cards
        for (let i = 1; i <= 4; ++i) {
            cards.push(new cardModule.Card('R', null));
            cards.push(new cardModule.Card('G', null));
            cards.push(new cardModule.Card('B', null));
        }

        // add the rose card
        cards.push(new cardModule.Card('X', null));

        //pick 5 random cards at a time and add them to the next
        //spot on the board. then remove them from 'cards'

        this.deck = [[], [], [], [], [], [], [], []];

        let count = 0;
        while (cards.length > 0) {
            let index = parseInt(Math.random() * (cards.length));
            this.deck[parseInt(count / 5)].push(cards[index]);
            cards.splice(index, 1);
            ++count;
        }

        this.started = true;
    }

    solved(username) {
        let now = Date.now();
        let index = this.users.findIndex(u => u.username === username);
        if (index >= 0) {
            this.users[index].endTime = now;
        }
    }

    completedUsers() {
        return this.users.filter(u => u.endTime);
    }
}

module.exports.Game = Game;