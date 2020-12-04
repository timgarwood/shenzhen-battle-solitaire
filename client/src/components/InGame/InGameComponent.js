import React, { Component } from 'react';
import SolitaireService from '../../services/SolitaireService';
import ChatComponent from './Chat/ChatComponent';
import GameplayComponent from './Gameplay/GameplayComponent';
import Backdrop from '../util/Backdrop/Backdrop';
import Modal from '../util/Modal/Modal';
import SolvedComponent from '../InGame/Solved/SolvedComponent';
import "./InGameComponent.css";
import numberCard from '../../images/red-1.png';
import dragonCard from '../../images/red.png';
import roseCard from '../../images/rose.png';

export default class InGameComponent extends Component {
    constructor() {
        super();
        this.service = new SolitaireService();

        this.state = {
            deck: null,
            isNewDeck: false,
            gameStarted: false,
            solved: false,
            usersSolved: null,
            startingMessage: null,
            originalDeck: null,
            displayingHelp: false
        };
    }

    copyDeck = (oldDeck) => {
        let deck = [];
        for (let i = 0; i < oldDeck.length; ++i) {
            let stack = [];
            for (let j = 0; j < oldDeck[i].length; ++j) {
                stack.push({ ...oldDeck[i][j] });
            }

            deck.push(stack);
        }

        return deck;
    }

    componentWillMount() {
        this.socket = this.service.joinGame(this.props.username, this.props.game.name);

        this.socket.on('solitaire.game.usersSolved', (message) => {
            this.handleUsersSolved(message);
        })

        this.socket.on('solitaire.game.started', (message) => {
            this.handleGameStarted(message);
        });

        this.socket.on('solitaire.game.starting', (message) => {
            this.handleGameStarting(message);
        })

    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    onGameSolved = () => {
        let message = {
            username: this.props.username,
            gameName: this.props.game.name
        };

        this.socket.emit('solitaire.game.solved', message);
    }

    handleGameStarting = (message) => {
        this.setState({
            startingMessage: `The game will start in ${message.delay} seconds`
        })
    }

    handleGameStarted = (message) => {
        this.setState({
            originalDeck: this.copyDeck(message.game.deck),
            deck: this.copyDeck(message.game.deck),
            isNewDeck: true
        })
    }

    handleUsersSolved = (message) => {
        this.setState({
            usersSolved: message.users,
            isNewDeck: false
        });
    }

    resetDeck = () => {
        this.setState({
            deck: this.copyDeck(this.state.originalDeck),
            isNewDeck: true
        });
    }

    startGameClicked = () => {
        var startMessage = {
            gameName: this.props.game.name
        };

        this.socket.emit('solitaire.game.start', startMessage);

        this.setState({
            gameStarted: true,
            solved: false,
            deck: null,
            usersSolved: null,
            isNewDeck: false
        });
    }

    instructionsClicked = (evt) => {
        this.setState({
            displayingHelp: true,
            isNewDeck: false
        });
    }

    instructionsCleared = (evt) => {
        this.setState({
            displayingHelp: false,
            isNewDeck: false
        });
    }

    render() {
        let lobbyModal = (
            <div>
            </div>
        );

        let instructionsModal = (
            <div>
            </div>
        )

        let solvedModal = (<div></div>);

        if (this.state.usersSolved) {
            let userIndex = this.state.usersSolved.findIndex(u => u.username === this.props.username);
            if (userIndex >= 0) {
                solvedModal = (
                    <SolvedComponent
                        startGame={this.startGameClicked}
                        usersSolved={this.state.usersSolved}></SolvedComponent>
                )
            }
        }

        if (!this.state.deck) {
            if (this.props.game.createdBy === this.props.username) {
                lobbyModal = (
                    <div width="100%">
                        <Backdrop show="true" />
                        <Modal>
                            {this.state.startingMessage &&
                                <div style={{ paddingTop: "15%" }}>
                                    <p style={{ textAlign: "center" }}>
                                        {this.state.startingMessage}
                                    </p>
                                </div>
                            }

                            {!this.state.startingMessage &&
                                <div style={{ paddingTop: "15%" }}>
                                    <p style={{ textAlign: "center" }}>
                                        You are the game host.  Click below to start the game.
                                    </p>
                                    <p style={{ textAlign: "center" }}>
                                        <button className="modal-button"
                                            onClick={this.startGameClicked}>Start Game</button>
                                    </p>
                                </div>
                            }
                        </Modal>
                    </div>
                )

            } else {
                lobbyModal = (
                    <div width="100%">
                        <Backdrop show="true" />
                        <Modal>
                            {this.state.startingMessage &&
                                <div style={{ paddingTop: "15%" }}>
                                    <p style={{ textAlign: "center" }}>
                                        {this.state.startingMessage}
                                    </p>
                                </div>
                            }

                            {!this.state.startingMessage &&
                                <div style={{ paddingTop: "15%" }}>
                                    <p className="modal-text">Waiting for {this.props.game.createdBy} to start the game.</p>
                                </div>
                            }
                        </Modal>
                    </div >
                )
            }
        }

        if (this.state.displayingHelp) {
            /*instructionsModal = (
                <div>
                    <Modal>
                            <div className="instruction">
                                <img className="instruction-card" src={dragonCard} />
                                <text style={{ verticalAlign: "top" }} className="modal-text">
                                    Dragon cards can be placed on empty spaces or empty dragon spaces. When all 4 dragon cards of a color
                                    are uncovered, the button will light up.  Clicking the button will stack the uncovered dragon
                                    cards onto a single space.  That space will be marked with a X.
                                </text>
                            </div>
                            <div className="instruction">
                                <img className="instruction-card" src={roseCard} />
                                <text style={{ verticalAlign: "top" }} className="modal-text">
                                    The rose card is a freebie.  When the rose card is uncovered, it can be automatically
                                    placed in the rose space.
                                </text>
                            </div>
                            <div style={{ textAlign: "center" }} className="instruction">
                                <button className="modal-button"
                                    onClick={this.instructionsCleared}>Close</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )
            */

            instructionsModal = (
                <div>
                    <Modal>
                        <p style={{ textAlign: "center" }}>
                            How to Play
                        </p>
                        <p style={{ textAlign: "center" }}>
                            The goal of the game is to move all of the number cards into the 3 number slots at the top right of the board.
                            Number cards can only be placed in sequence.  At the start of the game, the number slot is empty, and
                            only the '1' card can be placed.  When the '1' card is placed, only the '2' card can be placed, and so on.  The game
                            is completed when all of the '9' cards are placed.
                        </p>
                        <div className="instruction">
                            <div className="instruction-head">
                                <img className="instruction-card" src={numberCard} />
                            </div>
                            <div className="instruction-detail">
                                You can move a number card onto an empty space, a dragon space, or underneath another number card
                                as long as it forms a valid sequence (a different color, and sequential numbers).  You can also
                                move a group of number cards as long as the group forms a valid sequence.
                            </div>
                        </div>
                        <div className="instruction">
                            <div className="instruction-head">
                                <img className="instruction-card" src={dragonCard} />
                            </div>
                            <div className="instruction-detail">
                                Dragon cards can be placed on empty spaces or empty dragon spaces. When all 4 dragon cards of a color
                                are uncovered, the corresponding dragon button will light up.  Clicking the button will stack the uncovered dragon
                                cards onto a single space.  That space will be marked with a X and cannot be used again.
                            </div>
                        </div>
                        <div className="instruction">
                            <div className="instruction-head">
                                <img className="instruction-card" src={roseCard} />
                            </div>
                            <div className="instruction-detail">
                                The rose card is a freebie.  When the rose card is uncovered, it can be automatically
                                placed in the rose space.
                            </div>
                        </div>
                        <div style={{ textAlign: "center" }} className="instruction">
                            <button className="modal-button"
                                onClick={this.instructionsCleared}>Close</button>
                        </div>

                    </Modal>
                </div>
            )
        }

        return (
            <div className="game-main">
                <div className="game-controls">
                    <ul>
                        <li onClick={(evt) => this.resetDeck()}>
                            Reset Deck
                        </li>
                        <li onClick={(evt) => this.startGameClicked()}>
                            New Deck
                        </li>
                        <li onClick={this.instructionsClicked}>
                            Help
                        </li>
                    </ul>
                </div>


                <div className="game-components">
                    {solvedModal}
                    {lobbyModal}
                    {instructionsModal}
                    <GameplayComponent game={this.props.game}
                        deck={this.state.deck}
                        isNewDeck={this.state.isNewDeck}
                        username={this.props.username}
                        solved={() => { this.onGameSolved() }} />
                    <ChatComponent gameName={this.props.game.name}
                        username={this.props.username}
                        chatMessageTopic="solitaire.game.chat"
                        socket={this.socket} />
                </div>
            </div>
        );
    }
}