import React, { Component } from 'react';
import SolitaireService from '../../services/SolitaireService';
import ChatComponent from './Chat/ChatComponent';
import GameplayComponent from './Gameplay/GameplayComponent';
import Backdrop from '../util/Backdrop/Backdrop';
import Modal from '../util/Modal/Modal';
import SolvedComponent from '../InGame/Solved/SolvedComponent';

export default class InGameComponent extends Component {
    constructor() {
        super();
        this.service = new SolitaireService();

        this.state = {
            deck: null,
            gameStarted: false,
            solved: false,
            usersSolved: null
        };
    }

    componentWillMount() {
        this.socket = this.service.joinGame(this.props.username, this.props.game.name);

        this.socket.on('solitaire.game.usersSolved', (message) => {
            this.handleUsersSolved(message);
        })

        this.socket.on('solitaire.game.started', (message) => {
            this.handleGameStarted(message);
        });

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

    handleGameStarted = (message) => {
        this.setState({
            deck: message.game.deck
        })
    }

    handleUsersSolved = (message) => {
        this.setState({
            usersSolved: message.users
        });
    }

    startGameClicked = () => {
        var startMessage = {
            gameName: this.props.game.name
        };

        this.socket.emit('solitaire.game.start', startMessage);

        this.setState({
            gameStarted: true
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
                    <SolvedComponent usersSolved={this.state.usersSolved}></SolvedComponent>
                )
            }
        }

        if (!this.state.deck) {
            if (this.props.game.createdBy === this.props.username) {
                lobbyModal = (
                    <div>
                        <Backdrop show="true" />
                        <Modal>
                            <p style={{ textAlign: "center" }}>
                                <button className="modal-button"
                                    onClick={this.startGameClicked}>Start Game</button>
                            </p>
                        </Modal>

                    </div>
                )

            } else {
                lobbyModal = (
                    <div>
                        <Backdrop show="true" />
                        <Modal>
                            <p className="modal-text">Waiting for {this.props.game.createdBy} to start the game.</p>
                        </Modal>
                    </div>
                )
            }
        }

        return (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignContent: "stretch" }}>
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
        );
    }
}