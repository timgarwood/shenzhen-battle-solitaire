import React, { Component } from 'react';
import SolitaireService from '../../services/SolitaireService';
import ChatComponent from './Chat/ChatComponent';
import GameplayComponent from './Gameplay/GameplayComponent';
import Backdrop from '../util/Backdrop/Backdrop';
import Modal from '../util/Modal/Modal';
import SolvedComponent from '../InGame/Solved/SolvedComponent';
import "./InGameComponent.css";

export default class InGameComponent extends Component {
    constructor() {
        super();
        this.service = new SolitaireService();

        this.state = {
            deck: null,
            gameStarted: false,
            solved: false,
            usersSolved: null,
            startingMessage: null,
            originalDeck: null
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
            deck: this.copyDeck(message.game.deck)
        })
    }

    handleUsersSolved = (message) => {
        this.setState({
            usersSolved: message.users
        });
    }

    resetDeck = () => {
        this.setState({
            deck: this.copyDeck(this.state.originalDeck)
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
        });
    }

    render() {
        let lobbyModal = (
            <div>
            </div>
        );

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
                    </ul>
                </div>


                <div className="game-components">
                    {solvedModal}
                    {lobbyModal}
                    <GameplayComponent game={this.props.game}
                        deck={this.state.deck}
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