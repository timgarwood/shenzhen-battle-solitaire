import React, { Component } from 'react';
import './ChatComponent.css';

export default class ChatComponent extends Component {
    state = {
        chatMessages: []
    }

    chatMessage = "";

    constructor() {
        super();
        this.chatWindowRef = React.createRef();
    }

    componentWillMount() {
        this.props.socket.on(this.props.chatMessageTopic, (chatMessage) => {
            this.handleChatMessage(chatMessage);
        })
    }

    submitMessage = () => {
        var message = {
            gameName: this.props.gameName,
            sender: this.props.username,
            messageBody: this.chatMessage,
            timestamp: new Date(Date.now()).toUTCString()
        }

        this.props.socket.emit(this.props.chatMessageTopic, message)
    }

    handleChatMessage(chatMessage) {
        let newMessages = [...this.state.chatMessages];
        newMessages.push(chatMessage);

        this.setState({
            chatMessages: newMessages
        });

        this.chatWindowRef.current.scrollTop = this.chatWindowRef.current.scrollHeight;
    }

    chatMessageChanged = (evt) => {
        this.chatMessage = evt.target.value;
    }

    render() {
        let messages = this.state.chatMessages.map(cm => {
            return (
                <li className="chat-message">{cm.timestamp} {cm.sender}: {cm.messageBody}</li>
            );
        });

        return (
            <div>
                <div ref={this.chatWindowRef} className="chat-window">
                    <ul className="chat-list">
                        {messages}
                    </ul>
                </div>
                <input type="text" onChange={this.chatMessageChanged}></input>
                <button onClick={() => this.submitMessage()}>Chat</button>
            </div>
        );
    }
}