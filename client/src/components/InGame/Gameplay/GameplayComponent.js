import React, { Component } from 'react';
import './GameplayComponent.css';
import CardComponent from './Card/CardComponent';
import red1 from '../../../images/red-1.png';
import red2 from '../../../images/red-2.png';
import red3 from '../../../images/red-3.png';
import red4 from '../../../images/red-4.png';
import red5 from '../../../images/red-5.png';
import red6 from '../../../images/red-6.png';
import red7 from '../../../images/red-7.png';
import red8 from '../../../images/red-8.png';
import red9 from '../../../images/red-9.png';

import green1 from '../../../images/green-1.png';
import green2 from '../../../images/green-2.png';
import green3 from '../../../images/green-3.png';
import green4 from '../../../images/green-4.png';
import green5 from '../../../images/green-5.png';
import green6 from '../../../images/green-6.png';
import green7 from '../../../images/green-7.png';
import green8 from '../../../images/green-8.png';
import green9 from '../../../images/green-9.png';

import black1 from '../../../images/black-1.png';
import black2 from '../../../images/black-2.png';
import black3 from '../../../images/black-3.png';
import black4 from '../../../images/black-4.png';
import black5 from '../../../images/black-5.png';
import black6 from '../../../images/black-6.png';
import black7 from '../../../images/black-7.png';
import black8 from '../../../images/black-8.png';
import black9 from '../../../images/black-9.png';

export default class GameplayComponent extends Component {
    state = {
        gameStarted: false,
        deck: [],
        movingCards: null
    }

    constructor() {
        super();

        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.dropCard = null;

        this.cardImgSources = [];
        this.cardImgSources.push({ name: 'red-1', source: red1 });
        this.cardImgSources.push({ name: 'red-2', source: red2 });
        this.cardImgSources.push({ name: 'red-3', source: red3 });
        this.cardImgSources.push({ name: 'red-4', source: red4 });
        this.cardImgSources.push({ name: 'red-5', source: red5 });
        this.cardImgSources.push({ name: 'red-6', source: red6 });
        this.cardImgSources.push({ name: 'red-7', source: red7 });
        this.cardImgSources.push({ name: 'red-8', source: red8 });
        this.cardImgSources.push({ name: 'red-9', source: red9 });

        this.cardImgSources.push({ name: 'green-1', source: green1 });
        this.cardImgSources.push({ name: 'green-2', source: green2 });
        this.cardImgSources.push({ name: 'green-3', source: green3 });
        this.cardImgSources.push({ name: 'green-4', source: green4 });
        this.cardImgSources.push({ name: 'green-5', source: green5 });
        this.cardImgSources.push({ name: 'green-6', source: green6 });
        this.cardImgSources.push({ name: 'green-7', source: green7 });
        this.cardImgSources.push({ name: 'green-8', source: green8 });
        this.cardImgSources.push({ name: 'green-9', source: green9 });

        this.cardImgSources.push({ name: 'black-1', source: black1 });
        this.cardImgSources.push({ name: 'black-2', source: black2 });
        this.cardImgSources.push({ name: 'black-3', source: black3 });
        this.cardImgSources.push({ name: 'black-4', source: black4 });
        this.cardImgSources.push({ name: 'black-5', source: black5 });
        this.cardImgSources.push({ name: 'black-6', source: black6 });
        this.cardImgSources.push({ name: 'black-7', source: black7 });
        this.cardImgSources.push({ name: 'black-8', source: black8 });
        this.cardImgSources.push({ name: 'black-9', source: black9 });

        this.cardWidth = '100px';
        this.cardHeight = '175px';
        this.slots = [
            {
                x: 0,
                y: 0,
                type: 'Dragon'
            },
            {
                x: 120,
                y: 0,
                type: 'Dragon'
            },
            {
                x: 240,
                y: 0,
                type: 'Dragon'
            },
            {
                x: 400,
                y: 0,
                type: 'Rose'
            },
            {
                x: 520,
                y: 0,
                type: 'Number'
            },
            {
                x: 640,
                y: 0,
                type: 'Number'
            },
            {
                x: 760,
                y: 0,
                type: 'Number'
            }
        ]

        this.xPixels = [
        ];
    }

    componentWillMount() {
        this.props.socket.on('solitaire.game.started', (message) => {
            this.handleGameStarted(message);
        });
    }

    getImageSource = (cardData) => {
        let color = "red";
        if (cardData.color === 'G') {
            color = "green";
        } else if (cardData.color === 'B') {
            color = "black";
        }

        let value = '1';

        if (cardData.value) {
            value = cardData.value;
        }

        let index = this.cardImgSources.findIndex(cis => cis.name === `${color}-${value}`);

        if (index < 0) {
            return red1;
        }

        return this.cardImgSources[index].source;
    }

    handleGameStarted = (message) => {
        let newDeck = message.game.deck;
        for (let left = 0; left < newDeck.length; ++left) {
            let currentLeft = (20 + (left * 150));
            for (let top = 0; top < newDeck[left].length; ++top) {
                let currentTop = (200 + (top * 30));
                newDeck[left][top].x = currentLeft;
                newDeck[left][top].y = currentTop;
                newDeck[left][top].z = 0;
            }
        }

        this.setState({
            deck: newDeck
        });
    }

    startGameClicked = () => {
        var startMessage = {
            gameName: this.props.game.name
        };

        this.props.socket.emit('solitaire.game.start', startMessage);

        this.setState({
            gameStarted: true
        });
    }

    // determines if adding the given array of cards to 
    // the end of the other array will create a valid sequence
    validSequence = (source, destination) => {
        if (!destination || destination.length == 0) return true;

        var tmp = [...source];
        destination.forEach(d => {
            tmp.push(d);
        })

        for (let i = 0; i < tmp.length - 1; ++i) {
            if (!tmp[i].value || !tmp[i + 1].value) {
                return false;
            }

            if ((tmp[i].value !== (tmp[i + 1].value + 1)) ||
                (tmp[i].color === tmp[i + 1].color)) {
                return false;
            }
        }

        return true;
    }

    onMouseMove = (evt) => {
        if (this.state.movingCards) {
            let nextMovingCards = [... this.state.movingCards];
            let xdiff = evt.pageX - this.lastMouseX;
            let ydiff = evt.pageY - this.lastMouseY;

            for (let i = 0; i < nextMovingCards.length; ++i) {
                nextMovingCards[i].x += xdiff;
                nextMovingCards[i].y += ydiff;
            }

            this.setState({
                movingCards: nextMovingCards
            });
        }

        this.lastMouseX = evt.pageX;
        this.lastMouseY = evt.pageY;
    }

    onMouseUp = (evt, left, top) => {
        evt.stopPropagation();
        evt.preventDefault();

        let newDeck = [...this.state.deck];

        if (this.state.movingCards) {
            let topMovingCard = this.state.movingCards[0];
            let dropY = topMovingCard.yOrig;
            let dropX = topMovingCard.xOrig;

            if (this.dropCard) {
                let source = [this.dropCard];
                if (this.validSequence(source, this.state.movingCards)) {
                    // remove the moving cards from their original position in the deck
                    // and add them underneath 'dropCard'.
                    let spliceLeft = topMovingCard.leftIndex;
                    let spliceTop = topMovingCard.topIndex;
                    newDeck[spliceLeft].splice(spliceTop, newDeck[spliceLeft].length - spliceTop);

                    dropY = this.dropCard.y + 30;
                    dropX = this.dropCard.x;

                    for (let i = 0; i < this.state.movingCards.length; ++i) {
                        newDeck[left].push(this.state.movingCards[i]);
                    }

                    this.dropCard = null;
                }
            }

            for (let i = 0; i < this.state.movingCards.length; ++i) {
                this.state.movingCards[i].x = dropX;
                this.state.movingCards[i].y = dropY;
                this.state.movingCards[i].z = 0;
                dropY += 30;
            }

            this.setState({
                deck: newDeck,
                movingCards: null
            });
        }
    }

    onCardEnter = (evt, left, top) => {

        console.log(`onCardEnter ${left} ${top}`);
        if (this.state.movingCards) {
            if (this.state.movingCards[0].leftIndex != left) {
                // drop card can only be the one at the top of this stack
                if (top == this.state.deck[left].length - 1) {
                    this.dropCard = this.state.deck[left][top];
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            }

        }

    }

    onCardLeave = (evt, left, top) => {
        this.dropCard = null;
    }

    onCardSelected = (evt, left, top) => {
        evt.stopPropagation();
        evt.preventDefault();

        let nextMovingCards = []

        let source = []
        let tmpSrc = this.state.deck[left][top];
        tmpSrc.leftIndex = left;
        tmpSrc.topIndex = top;
        tmpSrc.yOrig = tmpSrc.y;
        tmpSrc.xOrig = tmpSrc.x;
        tmpSrc.z = 100;

        source.push(tmpSrc);

        let dest = [];

        for (let i = top + 1; i < this.state.deck[left].length; ++i) {
            let tmpDst = this.state.deck[left][i];
            tmpDst.leftIndex = left;
            tmpDst.topIndex = i;
            tmpDst.yOrig = tmpDst.y;
            tmpDst.xOrig = tmpDst.x;
            tmpDst.z = 100;
            dest.push(tmpDst);
        }

        if (this.validSequence(source, dest)) {
            nextMovingCards.push(source[0]);
            for (let i = 0; i < dest.length; ++i) {
                nextMovingCards.push(dest[i]);
            }

            this.setState({
                movingCards: nextMovingCards
            })
        }
    }


    render() {
        let slotDivs = this.slots.map(s => {
            return (
                <div className="empty-card-slot"
                    style={
                        {
                            width: this.cardWidth,
                            height: this.cardHeight,
                            position: 'absolute',
                            left: s.x,
                            top: s.y
                        }
                    }>
                </div>
            );
        })

        let startGameDiv = (
            <div>
            </div>
        );

        let stackDivs = [];

        //if (!this.state.gameStarted &&
        //    this.props.username === this.props.game.createdBy) {
        startGameDiv = (
            <div>
                <button onClick={this.startGameClicked}>Start Game</button>
            </div>
        );
        //} else
        if (this.state.deck) {
            for (let left = 0; left < this.state.deck.length; ++left) {
                let stackDiv = [];
                for (let top = 0; top < this.state.deck[left].length; ++top) {
                    stackDiv.push((
                        <CardComponent imgSrc={this.getImageSource(this.state.deck[left][top])}
                            top={this.state.deck[left][top].y}
                            left={this.state.deck[left][top].x}
                            z={this.state.deck[left][top].z}
                            value={this.state.deck[left][top].value}
                            color={this.state.deck[left][top].color}
                            onMouseEnter={(evt) => this.onCardEnter(evt, left, top)}
                            onMouseLeave={(evt) => this.onCardLeave(evt, left, top)}
                            onMouseDown={(evt) => this.onCardSelected(evt, left, top)}
                            onMouseUp={(evt) => this.onMouseUp(evt, left, top)} />
                    ));
                }

                stackDivs.push(stackDiv);
            }
        }

        return (
            <div>
                <div className="game-window"
                    onMouseMove={this.onMouseMove}>
                    {slotDivs}
                    {stackDivs}
                </div>


                {startGameDiv}
            </div>
        )
    }
}