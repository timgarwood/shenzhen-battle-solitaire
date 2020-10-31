import React, { Component } from 'react';
import GameListItemComponent from './GameListItemComponent';
import '../util/Modal/Modal.css';

export default class GameListComponent extends Component {
    render() {
        let gameItems = this.props.games.map(g => {
            if (!g.started) {
                return (
                    <GameListItemComponent
                        id={g.name}
                        username={this.props.username}
                        game={g}
                        joinClicked={() => this.props.joinClicked(g)}
                        deleteClicked={() => this.props.deleteClicked(g)} />
                );
            }

            return;
        });

        return this.props.games.length > 0 ? (
            <div>
                <text className="modal-text">Join a Game</text>
                {gameItems}
            </div>
        ) : null;
    }
}