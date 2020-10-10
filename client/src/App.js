import React, { Component } from 'react';
import SolitaireService from './services/SolitaireService';
import GameListComponent from './components/GameList/GameListComponent';
import CreateGameComponent from './components/CreateGame/CreateGameComponent';

export default class App extends Component {
  state = {
    inGame: false,
    gameList: []
  }

  constructor() {
    super();
    this.service = new SolitaireService();
  }

  componentWillMount() {
    this.service.getGamesList((list) => {
      this.setState({
        gameList: list.data
      });
    });
  }

  createGameClicked = (gameName) => {
    this.service.createGame(gameName, (response) => {
      let newGameList = [...this.state.gameList];
      newGameList.push(response.data);

      this.setState({
        gameList: newGameList
      })
    })
  }

  joinGameClicked = (gameName) => {
    console.log(`joining ${gameName}`);
  }

  render() {
    if (!this.state.inGame) {
      if (this.state.gameList) {
        return (
          <div>
            <CreateGameComponent clicked={this.createGameClicked} />
            <GameListComponent games={this.state.gameList} joinClicked={this.joinGameClicked} />
          </div>
        );
      }
    }

    return (
      <div>
        Hello World
      </div>
    );
  }
}