import React, { Component } from 'react';

export default class CreateGameComponent extends Component {
    state = {
        gameName: ""
    }

    gameNameChanged = (evt) => {
        this.setState({
            gameName: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.gameNameChanged}></input>
                <button onClick={() => this.props.clicked(this.state.gameName)}>Create Game</button>
            </div>
        )
    }
}