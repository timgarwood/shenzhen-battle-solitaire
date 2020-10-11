import React, { Component } from 'react';

export default class ChatComponent extends Component {
    state = {
        chatMessages: []
    }

    chatMessage = "";

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
            timestamp: Date.now().toString()
        }

        this.props.socket.emit(this.props.chatMessageTopic, message)
    }

    handleChatMessage(chatMessage) {
        let newMessages = [...this.state.chatMessages];
        newMessages.push(chatMessage);

        this.setState({
            chatMessages: newMessages
        });
    }

    chatMessageChanged = (evt) => {
        this.chatMessage = evt.target.value;
    }

    render() {
        let messages = this.state.chatMessages.map(cm => {
            return (
                <li>{cm.timestamp} {cm.sender}: {cm.messageBody}</li>
            );
        });

        return (
            <div>
                <ul>
                    {messages}
                </ul>
                <input type="text" onChange={this.chatMessageChanged}></input>
                <button onClick={() => this.submitMessage()}>Chat</button>
            </div>
        );
    }
}