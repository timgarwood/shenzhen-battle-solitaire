var cardModule = require('./card');

class Game {
    constructor(name) {
        this.name = name;
    }

    start() {
        let cards = [];

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

        this.board = [[], [], [], [], [], [], [], []];
        this.dragonSlots = [null, null, null];
        this.numberSlots = [[], [], []];

        let count = 0;
        while (cards.length > 0) {
            let index = parseInt(Math.random() * (cards.length - 1));
            this.board[parseInt(count / 5)].push(cards[index]);
            cards.splice(index, 1);
            ++count;
        }
    }
}

module.exports.Game = Game;