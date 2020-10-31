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
        this.chatBoxRef = React.createRef();
    }

    componentWillMount() {
        this.props.socket.on(this.props.chatMessageTopic, (chatMessage) => {
            this.handleChatMessage(chatMessage);
        })
    }

    submitMessage = () => {
        if (this.chatMessage && this.chatMessage != "") {
            var message = {
                gameName: this.props.gameName,
                sender: this.props.username,
                messageBody: this.chatMessage,
                timestamp: new Date(Date.now()).toUTCString()
            }

            this.props.socket.emit(this.props.chatMessageTopic, message)

            this.chatMessage = "";
            this.chatBoxRef.current.value = "";
        }
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
            let senderClass = "chat-message-mine";
            if (cm.sender !== this.props.username) {
                senderClass = "chat-message-yours";
            }
            return (
                <div>
                    <li className={`chat-message-timestamp`}>
                        {cm.timestamp}
                    </li>
                    <li className={`chat-message ${senderClass}`}>
                        <b>{cm.sender}</b>:{cm.messageBody}
                    </li>
                </div>
            );
        });

        return (
            <div className="ChatComponent">
                <div ref={this.chatWindowRef} className="chat-window">
                    <ul>
                        {messages}
                    </ul>
                </div>

                <textarea className="chat-textbox"
                    ref={this.chatBoxRef}
                    onChange={this.chatMessageChanged}></textarea>

                <button className="chat-button"
                    onClick={() => this.submitMessage()}>Chat</button>
            </div>
        );
    }
}