import React, { Component } from 'react';
import GameListItemComponent from './GameListItemComponent';

export default class GameListComponent extends Component {
    render() {
        let gameItems = this.props.games.map(g => {
            return (
                <GameListItemComponent id={g.name} name={g.name} joinClicked={() => this.props.joinClicked(g.name)} />
            );
        })

        return (
            <div>
                {gameItems}
            </div>
        );
    }
}