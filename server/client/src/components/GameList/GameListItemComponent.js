import React, { Component } from 'react';
import '../util/Modal/Modal.css';
import './GameListItemComponent.css';

export default class GameListItemComponent extends Component {
    render() {
        let deleteButton = null;

        if (this.props.game.createdBy === this.props.username) {
            deleteButton = (
                <button style={{ backgroundColor: "red" }}
                    className="modal-button-sm"
                    onClick={this.props.deleteClicked}>Delete Game</button>
            );
        }

        return (
            <div className="GameListItemComponent">
                <div className="game-list-item-child">
                    <text className="modal-text">{this.props.game.name}</text>
                </div>
                <div className="game-list-item-child">
                    <button className="modal-button-sm" onClick={this.props.joinClicked}>Join Game</button>
                </div>
                <div className="game-list-item-child">
                    {deleteButton}
                </div>
            </div >
        )
    }
}