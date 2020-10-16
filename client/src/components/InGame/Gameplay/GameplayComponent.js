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
        deck: []
    }

    constructor() {
        super();

        this.lastMouseX = 0;
        this.lastMouseY = 0;

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

        this.cardRefs = null;
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
        this.setState({
            deck: message.game.deck
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
            if (!tmp[i].value || !tmp[i + 1].value) return false;

            if ((tmp[i].value != tmp[i + 1] + 1) ||
                (tmp[i].color === tmp[i + 1].color)) return false;
        }

        return true;
    }

    onMouseMove = (evt) => {
        console.log(evt.target.value);
        if (this.cardRefs) {
            let xdiff = evt.target.x - this.lastMouseX;
            let ydiff = evt.target.y - this.lastMouseY;

            for (let i = 0; i < this.cardRefs.length; ++i) {
                this.cardRefs[i].current.x += xdiff;
                this.cardRefs[i].current.y += ydiff;
            }

            this.lastMouseX = evt.target.x;
            this.lastMouseY = evt.target.y;
        }
    }

    onMouseUp = (evt) => {
        this.cardRefs = [];
    }

    cardSelected = (refs, left, top) => {
        this.cardRefs = [];
        this.cardRefs.push(refs[top]);

        let source = [];
        let dest = [];
        source.push(this.state.deck[left][top]);

        for (let i = top + 1; i < this.state.deck[left].length; ++i) {
            dest.push(this.state.deck[left][i]);
        }

        if (this.validSequence(source, dest)) {
            for (let i = top + 1; i < refs.length; ++i) {
                this.cardRefs.push(refs[i]);
            }
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

        if (!this.state.gameStarted &&
            this.props.username === this.props.game.createdBy) {
            startGameDiv = (
                <div>
                    <button onClick={this.startGameClicked}>Start Game</button>
                </div>
            )
        } else if (this.state.deck) {
            for (let left = 0; left < this.state.deck.length; ++left) {
                let currentLeft = (20 + (left * 150));
                let stackDiv = [];
                let stackRefs = [];
                for (let top = 0; top < this.state.deck[left].length; ++top) {
                    let currentTop = (200 + (top * 30));
                    let data = this.state.deck[left][top];
                    let cardRef = React.createRef();
                    stackRefs.push(cardRef);
                    stackDiv.push((
                        <CardComponent imgSrc={this.getImageSource(data)}
                            top={currentTop}
                            left={currentLeft}
                            value={data.value}
                            color={data.color}
                            ref={cardRef}
                            onMouseDown={(cardComponent) => this.cardSelected(stackRefs, left, top)} />
                    ));
                }

                stackDivs.push(stackDiv);
            }
        }

        return (
            <div>
                <div className="game-window"
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}>
                    {slotDivs}
                    {stackDivs}
                </div>


                {startGameDiv}
            </div>
        )
    }
}