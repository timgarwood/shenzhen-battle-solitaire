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
import redDragon from '../../../images/red.png';

import green1 from '../../../images/green-1.png';
import green2 from '../../../images/green-2.png';
import green3 from '../../../images/green-3.png';
import green4 from '../../../images/green-4.png';
import green5 from '../../../images/green-5.png';
import green6 from '../../../images/green-6.png';
import green7 from '../../../images/green-7.png';
import green8 from '../../../images/green-8.png';
import green9 from '../../../images/green-9.png';
import greenDragon from '../../../images/green.png';

import black1 from '../../../images/black-1.png';
import black2 from '../../../images/black-2.png';
import black3 from '../../../images/black-3.png';
import black4 from '../../../images/black-4.png';
import black5 from '../../../images/black-5.png';
import black6 from '../../../images/black-6.png';
import black7 from '../../../images/black-7.png';
import black8 from '../../../images/black-8.png';
import black9 from '../../../images/black-9.png';
import blackDragon from '../../../images/black.png';

import rose from '../../../images/rose.png';
import frozen from '../../../images/frozen.png';

export default class GameplayComponent extends Component {
    state = {
        deck: null,
        movingCards: null
    }

    constructor() {
        super();

        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.dropCard = null;
        this.dropDragon = null;

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

        this.cardImgSources.push({ name: 'red', source: redDragon });
        this.cardImgSources.push({ name: 'green', source: greenDragon });
        this.cardImgSources.push({ name: 'black', source: blackDragon });

        this.cardWidth = '100px';
        this.cardHeight = '175px';

        this.deckSlots = [
            {
                x: 20,
                y: 220
            },
            {
                x: 150,
                y: 220
            },
            {
                x: 280,
                y: 220
            },
            {
                x: 410,
                y: 220
            },
            {
                x: 540,
                y: 220
            },
            {
                x: 670,
                y: 220
            },
            {
                x: 800,
                y: 220
            },
            {
                x: 930,
                y: 220
            },
        ];

        this.dragonSlots = [
            {
                x: 20,
                y: 20,
                cardData: null
            },
            {
                x: 150,
                y: 20,
                cardData: null
            },
            {
                x: 280,
                y: 20,
                cardData: null
            }
        ];

        this.roseSlot = {
            x: 550,
            y: 20,
            cardData: null
        };

        this.buttonSlots = [
            {
                color: 'R',
                x: 410,
                y: 20,
                enabled: false
            },
            {
                color: 'G',
                x: 410,
                y: 50,
                enabled: false
            },
            {
                color: 'B',
                x: 410,
                y: 80,
                enabled: false
            }
        ]

        this.colorSlots = [
            {
                x: 670,
                y: 20,
                cardData: null
            },
            {
                x: 800,
                y: 20,
                cardData: null
            },
            {
                x: 930,
                y: 20,
                cardData: null
            }
        ];
    }

    getImageSource = (cardData) => {
        if (!cardData) return null;

        let color = "red";
        if (cardData.color === 'G') {
            color = "green";
        } else if (cardData.color === 'B') {
            color = "black";
        }

        let index = 0;

        if (cardData.color === 'X') {
            return rose;
        }

        if (cardData.value) {
            index = this.cardImgSources.findIndex(cis => cis.name === `${color}-${cardData.value}`);
        } else {
            index = this.cardImgSources.findIndex(cis => cis.name === `${color}`);
        }

        index = index >= 0 ? index : 0;

        return this.cardImgSources[index].source;
    }

    handleGameStarted = (newDeck) => {
        for (let i = 0; i < this.dragonSlots.length; ++i) {
            this.dragonSlots[i].cardData = null;
            this.dragonSlots[i].frozen = false;
        }

        for (let i = 0; i < this.colorSlots.length; ++i) {
            this.colorSlots[i].cardData = null;
        }

        this.roseSlot.cardData = null;

        for (let left = 0; left < newDeck.length; ++left) {
            for (let top = 0; top < newDeck[left].length; ++top) {
                newDeck[left][top].x = this.deckSlots[left].x;
                newDeck[left][top].y = this.deckSlots[left].y + (top * 30);
                newDeck[left][top].leftIndex = left;
                newDeck[left][top].topIndex = top;
                newDeck[left][top].z = 0;
            }
        }

        this.setState({
            deck: newDeck
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

    isSolved = (newDeck) => {
        let solved = true;
        for (let i = 0; i < newDeck.length; ++i) {
            if (newDeck[i].length > 0) {
                solved = false;
                break;
            }
        }

        return solved;
    }

    onGameWindowMouseUp = (evt) => {
        if (this.state.movingCards) {
            this.returnToOriginalPosition();

            this.setState({
                movingCards: null
            });
        }
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

    getRevealedDragonCards = (color) => {
        let revealedCards = [];
        // check all the dragon slots
        for (let d = 0; d < this.dragonSlots.length; ++d) {
            if (this.dragonSlots[d].cardData &&
                !this.dragonSlots[d].cardData.value &&
                this.dragonSlots[d].cardData.color === color) {
                revealedCards.push(this.dragonSlots[d].cardData);
            }
        }

        // then check all the deck slots
        for (let left = 0; left < this.state.deck.length; ++left) {
            let len = this.state.deck[left].length;
            if (len > 0) {
                if (!this.state.deck[left][len - 1].value &&
                    this.state.deck[left][len - 1].color === color) {
                    revealedCards.push(this.state.deck[left][len - 1]);
                }
            }
        }

        return revealedCards;
    }

    getDragonCardDestinationCandidates = (color) => {
        let candidates = this.dragonSlots
            .filter(ds => !ds.frozen && (!ds.cardData || ds.cardData.color === color));
        return candidates;
    }

    onDragonButtonClicked = (evt, dragonButton) => {
        let revealedCards = this.getRevealedDragonCards(dragonButton.color);
        let candidateDestinations = this.getDragonCardDestinationCandidates(dragonButton.color);

        let newDeck = [...this.state.deck];
        this.removeDragonCards(newDeck, revealedCards);

        candidateDestinations[0].frozen = true;

        //TODO: call PostMoveLogic here
        this.checkDragonButtons();

        let solved = this.isSolved(newDeck);

        if (solved) {
            this.props.solved();
        } else {
            this.setState({
                deck: newDeck
            });
        }
    }

    checkDragonButtons = () => {
        for (let i = 0; i < this.buttonSlots.length; ++i) {
            let revealedCards = this.getRevealedDragonCards(this.buttonSlots[i].color);
            let candidateDestinations = this.getDragonCardDestinationCandidates(this.buttonSlots[i].color);

            this.buttonSlots[i].enabled = (revealedCards.length === 4 &&
                candidateDestinations.length > 0);
        }
    }

    findNumberCards = (newDeck, value) => {
        let numberCards = [];
        for (let left = 0; left < newDeck.length; ++left) {
            for (let top = 0; top < newDeck[left].length; ++top) {
                if (newDeck[left][top].value === value) {
                    numberCards.push(newDeck[left][top]);
                }
            }
        }

        this.dragonSlots.forEach(ds => {
            if (ds.cardData && ds.cardData.value) {
                numberCards.push(ds.cardData);
            }
        });

        return numberCards;
    }

    findTopCards = (newDeck) => {
        let topCards = [];
        for (let left = 0; left < newDeck.length; ++left) {
            if (newDeck[left].length > 0) {
                topCards.push(newDeck[left][newDeck[left].length - 1]);
            }
        }

        this.dragonSlots.forEach(ds => {
            if (ds.cardData) {
                topCards.push(ds.cardData);
            }
        });

        return topCards;
    }

    canBeAutoMoved = (cardData) => {
        let colorSlot = this.colorSlots.find(cs => cs.cardData && cs.cardData.color === cardData.color);
        return (cardData.value === 1 ||
            (colorSlot &&
                colorSlot.cardData &&
                colorSlot.cardData.value === cardData.value - 1));
    }

    getAutoMoveCard = (newDeck) => {
        let cardData = null;
        for (let left = 0; left < newDeck.length; ++left) {
            let stack = newDeck[left];
            if (stack.length > 0) {
                let topCard = stack[stack.length - 1];
                if (topCard.value) {
                    let topCards = this.findTopCards(newDeck);
                    let matchingCards = this.findNumberCards(newDeck, topCard.value);
                    if (matchingCards.every(mc => topCards.includes(mc) &&
                        this.canBeAutoMoved(mc))) {
                        cardData = matchingCards[0];
                        let colorSlot = this.colorSlots.find(cs => cs.cardData && cs.cardData.color === cardData.color);
                        if (!colorSlot) {
                            colorSlot = this.colorSlots.find(cs => !cs.cardData);
                        }

                        colorSlot.cardData = cardData;
                        break;
                    }
                } else if (topCard.color === 'X') {
                    this.roseSlot.cardData = topCard;
                    cardData = topCard;
                    break;
                }
            }
        }

        if (cardData) {
            newDeck[cardData.leftIndex].splice(newDeck[cardData.leftIndex].length - 1, 1);
        }

        return cardData;
    }

    autoMoveCompleted = () => {
        this.postMoveLogic([...this.state.deck]);
    }

    postMoveLogic = (newDeck) => {
        let autoMove = this.getAutoMoveCard(newDeck);
        if (autoMove) {
            this.setState({
                deck: newDeck,
                movingCards: null
            });

            this.postMoveLogic(newDeck);
        } else {
            this.checkDragonButtons();

            let solved = this.isSolved(newDeck);
            if (solved) {
                this.props.solved();
            } else {
                this.setState({
                    deck: newDeck,
                    movingCards: null
                });
            }
        }
    }

    onCardMouseUp = (evt, left, top) => {
        evt.stopPropagation();
        evt.preventDefault();

        let newDeck = [...this.state.deck];

        if (this.state.movingCards) {
            let topMovingCard = this.state.movingCards[0];
            let dropY = topMovingCard.yOrig;
            let dropX = topMovingCard.xOrig;

            if (this.dropCard || top == -1) {
                let source = this.dropCard ? [this.dropCard] : [];
                if (this.validSequence(source, this.state.movingCards)) {
                    this.removeFromOriginalPosition(newDeck);

                    dropY = this.dropCard ? this.dropCard.y + 30 : this.deckSlots[left].y;
                    dropX = this.dropCard ? this.dropCard.x : this.deckSlots[left].x;

                    for (let i = 0; i < this.state.movingCards.length; ++i) {
                        newDeck[left].push(this.state.movingCards[i]);
                        this.state.movingCards[i].leftIndex = left;
                        this.state.movingCards[i].topIndex = newDeck[left].length - 1;
                    }

                    this.dropCard = null;

                    for (let i = 0; i < this.state.movingCards.length; ++i) {
                        this.state.movingCards[i].originalDragon = null;
                        this.state.movingCards[i].x = dropX;
                        this.state.movingCards[i].y = dropY;
                        this.state.movingCards[i].z = 0;
                        dropY += 30;
                    }

                    this.postMoveLogic(newDeck);

                    return;
                }
            }
        }

        this.returnToOriginalPosition();

        this.setState({
            movingCards: null
        });
    }

    onCardDoubleClick = (evt, left, top) => {
        evt.stopPropagation();
        evt.preventDefault();

        let card = this.state.deck[left][top];
        if (card.value) {
            let colorSlot = this.colorSlots.find(s => s.color === card.color);
            if ((!colorSlot.cardData && card.value === 1) ||
                (colorSlot.cardData.value === card.value - 1)) {
                let newDeck = [...this.state.deck];
                this.removeFromOriginalPosition(newDeck);

                colorSlot.cardData = card;

                this.checkDragonButtons();

                let solved = this.isSolved(newDeck);
                if (solved) {
                    this.props.solved();
                } else {
                    this.setState({
                        deck: newDeck,
                        movingCards: null
                    });
                }
            }
        }
    }

    onCardEnter = (evt, left, top) => {
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

        source.push(tmpSrc);

        let dest = [];

        for (let i = top + 1; i < this.state.deck[left].length; ++i) {
            let tmpDst = this.state.deck[left][i];
            tmpDst.leftIndex = left;
            tmpDst.topIndex = i;
            tmpDst.yOrig = tmpDst.y;
            tmpDst.xOrig = tmpDst.x;
            dest.push(tmpDst);
        }

        if (this.validSequence(source, dest)) {
            source[0].z = 100;
            nextMovingCards.push(source[0]);
            for (let i = 0; i < dest.length; ++i) {
                dest[i].z = 100;
                nextMovingCards.push(dest[i]);
            }

            this.setState({
                movingCards: nextMovingCards
            })
        }
    }

    onDragonEnter = (evt, dragonSlot) => {
        if (!dragonSlot.frozen) {
            if (this.state.movingCards && this.state.movingCards.length == 1) {
                if (dragonSlot.cardData == null) {
                    this.dropDragon = dragonSlot;
                }
            }
        }
    }

    onDragonLeave = (evt, dragonSlot) => {
        this.dropDragon = null;
    }

    onDragonSelected = (evt, dragonSlot) => {
        evt.stopPropagation();
        evt.preventDefault();

        if (dragonSlot.cardData) {
            dragonSlot.cardData.originalDragon = dragonSlot;
            dragonSlot.cardData.z = 100;
            this.setState({
                movingCards: [dragonSlot.cardData]
            });
        }
    }

    onDragonMouseUp = (evt, dragonSlot) => {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.state.movingCards) {
            let newDeck = [...this.state.deck];
            if (this.dropDragon) {
                //movingCards should only be valid if dropDragon is set ..
                this.removeFromOriginalPosition(newDeck);

                this.dropDragon.cardData = this.state.movingCards[0];
                this.state.movingCards[0].originalDragon = this.dropDragon;
                this.state.movingCards[0].leftIndex = -1;
                this.state.movingCards[0].topIndex = -1;
                this.state.movingCards[0].x = this.dropDragon.x;
                this.state.movingCards[0].y = this.dropDragon.y;
                this.dropDragon = null;

                this.postMoveLogic(newDeck);

                return;
            }

            this.returnToOriginalPosition();

            this.setState({
                movingCards: null
            });
        }

        this.dropDragon = null;
    }

    onRoseMouseUp = (evt) => {
        if (this.state.movingCards && this.state.movingCards.length == 1) {
            if (this.state.movingCards[0].color === 'X') {
                let newDeck = [...this.state.deck];
                this.removeFromOriginalPosition(newDeck);

                this.roseSlot.cardData = this.state.movingCards[0];

                this.checkDragonButtons();

                this.setState({
                    deck: newDeck,
                    movingCards: null
                });
            }
        }
    }

    onColorSlotMouseUp = (evt, slot) => {
        if (this.state.movingCards && this.state.movingCards.length == 1) {
            let topMovingCard = this.state.movingCards[0];
            if (topMovingCard.value) {
                if ((!slot.cardData && topMovingCard.value === 1) ||
                    (slot.cardData && slot.cardData.color === topMovingCard.color &&
                        slot.cardData.value === topMovingCard.value - 1)) {
                    let newDeck = [...this.state.deck];
                    this.removeFromOriginalPosition(newDeck);

                    slot.cardData = topMovingCard;

                    this.postMoveLogic(newDeck);

                    return;
                }
            }
        }

        this.returnToOriginalPosition();

        this.setState({
            movingCards: null
        });
    }

    removeFromOriginalPosition = (newDeck) => {
        if (this.state.movingCards) {
            let topMovingCard = this.state.movingCards[0];
            if (topMovingCard.originalDragon) {
                topMovingCard.originalDragon.cardData = null;
                topMovingCard.originalDragon = null;
            } else {
                // remove the moving cards from their original position in the deck
                // and add them underneath 'dropCard'.
                let spliceLeft = topMovingCard.leftIndex;
                let spliceTop = topMovingCard.topIndex;
                newDeck[spliceLeft].splice(spliceTop, newDeck[spliceLeft].length - spliceTop);
            }
        }
    }

    removeDragonCards = (newDeck, cards) => {
        for (let i = 0; i < cards.length; ++i) {
            if (cards[i].originalDragon) {
                cards[i].originalDragon.cardData = null;
                cards[i].originalDragon = null;
            } else {
                // remove the moving cards from their original position in the deck
                // and add them underneath 'dropCard'.
                let spliceLeft = cards[i].leftIndex;
                let spliceTop = cards[i].topIndex;
                newDeck[spliceLeft].splice(spliceTop, 1);

                cards[i].leftIndex = -1;
                cards[i].topIndex = -1;
            }
        }
    }

    returnToOriginalPosition = () => {
        if (this.state.movingCards) {
            let topMoving = this.state.movingCards[0];
            if (topMoving.originalDragon) {
                topMoving.x = topMoving.originalDragon.x;
                topMoving.y = topMoving.originalDragon.y;
                topMoving.z = 0;
                topMoving.originalDragon.cardData = topMoving;
            } else {
                // it must have come from the deck
                for (let i = 0; i < this.state.movingCards.length; ++i) {
                    this.state.movingCards[i].x = topMoving.xOrig;
                    this.state.movingCards[i].y = topMoving.yOrig + ((i) * 30);
                    this.state.movingCards[i].z = 0;
                }
            }
        }
    }

    componentWillReceiveProps(props) {
        if (props.deck && !this.state.deck) {
            this.handleGameStarted(props.deck);
        }
    }

    render() {
        let dragonSlotDivs = this.dragonSlots.map(s => {
            let dragonCardDiv = null;
            if (s.cardData) {
                dragonCardDiv = (
                    <CardComponent
                        x={s.cardData.x}
                        y={s.cardData.y}
                        z={s.cardData.z}
                        imgSrc={this.getImageSource(s.cardData)}
                        onMouseDown={(evt) => this.onDragonSelected(evt, s)} />
                );
            }

            return (
                <div>
                    <CardComponent
                        x={s.x}
                        y={s.y}
                        z="0"
                        //imgSrc={s.cardData != null ? this.getImageSource(s.cardData) : null}
                        imgSrc={s.frozen ? frozen : null}
                        onMouseEnter={(evt) => this.onDragonEnter(evt, s)}
                        onMouseLeave={(evt) => this.onDragonLeave(evt, s)}
                        onMouseDown={(evt) => this.onDragonSelected(evt, s)}
                        onMouseUp={(evt) => this.onDragonMouseUp(evt, s)} />

                    {dragonCardDiv}
                </div>
            );

        });

        let buttonDivs = this.buttonSlots.map(s => {
            return (
                <button disabled={!s.enabled}
                    onClick={(evt) => this.onDragonButtonClicked(evt, s)}
                    style={{ top: s.y, left: s.x, position: 'absolute' }}
                >Collapse {s.color}</button>
            );
        });

        let roseSlotDiv = (
            <CardComponent
                x={this.roseSlot.x}
                y={this.roseSlot.y}
                z="0"
                imgSrc={null}
                onMouseUp={this.onRoseMouseUp} />
        );

        if (this.roseSlot.cardData) {
            roseSlotDiv = (
                <CardComponent
                    x={this.roseSlot.x}
                    y={this.roseSlot.y}
                    z="0"
                    imgSrc={this.getImageSource(this.roseSlot.cardData)} />
            )
        }

        let colorSlotDivs = [];
        for (let i = 0; i < this.colorSlots.length; ++i) {
            colorSlotDivs.push((
                <CardComponent
                    x={this.colorSlots[i].x}
                    y={this.colorSlots[i].y}
                    z="0"
                    imgSrc={this.getImageSource(this.colorSlots[i].cardData)}
                    onMouseUp={(evt) => this.onColorSlotMouseUp(evt, this.colorSlots[i])} />
            ));
        }

        let deckSlotDivs = [];
        for (let i = 0; i < this.deckSlots.length; ++i) {
            deckSlotDivs.push((
                <CardComponent imgSrc={null}
                    x={this.deckSlots[i].x}
                    y={this.deckSlots[i].y}
                    z="0"
                    onMouseUp={(evt) => this.onCardMouseUp(evt, i, -1)} />
            ));
        }

        let stackDivs = [];
        let autoMove = null;

        /*if (this.state.autoMoveCard) {
            let colorSlot = this.colorSlots.find(cs => cs.cardData &&
                cs.cardData.color === this.state.autoMoveCard.color);
            if (!colorSlot) {
                colorSlot = this.roseSlot;
            }

            const styles = {
                top: this.state.autoMoveCard.y,
                left: this.state.autoMoveCard.x,
                transition: 'left 1.5s, top 1.5s, transform 1.5s',
                transform: `translate(${colorSlot.x}px, ${colorSlot.y}px)`
            };

            autoMove = (
                <div onTransitionEnd={() => { this.autoMoveCompleted() }}
                    style={styles}
                >
                    <img src={this.getImageSource(this.state.autoMoveCard)} />
                </div>
            )
        }
        */

        if (this.state.deck) {
            for (let left = 0; left < this.state.deck.length; ++left) {
                let stackDiv = [];
                for (let top = 0; top < this.state.deck[left].length; ++top) {
                    stackDiv.push((
                        <CardComponent imgSrc={this.getImageSource(this.state.deck[left][top])}
                            x={this.state.deck[left][top].x}
                            y={this.state.deck[left][top].y}
                            z={this.state.deck[left][top].z}
                            onDoubleClick={(evt) => this.onCardDoubleClick(evt, left, top)}
                            onMouseEnter={(evt) => this.onCardEnter(evt, left, top)}
                            onMouseLeave={(evt) => this.onCardLeave(evt, left, top)}
                            onMouseDown={(evt) => this.onCardSelected(evt, left, top)}
                            onMouseUp={(evt) => this.onCardMouseUp(evt, left, top)}
                        />
                    ));
                }
                stackDivs.push(stackDiv);
            }

        }

        return (
            <div className="game-window"
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onGameWindowMouseUp}>
                {dragonSlotDivs}
                {buttonDivs}
                {roseSlotDiv}
                {colorSlotDivs}
                {deckSlotDivs}
                {stackDivs}
                {autoMove}
            </div>


        )
    }
}