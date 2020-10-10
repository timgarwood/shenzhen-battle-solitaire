import React, { Component } from 'react';

export default class GameListItemComponent extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <button onClick={this.props.joinClicked}>Join Game</button>
            </div>
        )
    }
}