import React, { Component } from 'react';
import SolitaireService from '../../services/SolitaireService';
import ChatComponent from './Chat/ChatComponent';

export default class InGameComponent extends Component {
    constructor() {
        super();
        this.service = new SolitaireService();
    }

    componentWillMount() {
        this.socket = this.service.joinGame(this.props.username, this.props.game.name);
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    render() {
        return (
            <ChatComponent gameName={this.props.game.name}
                username={this.props.username}
                chatMessageTopic="solitaire.game.chat"
                socket={this.socket} />
        );
    }
}