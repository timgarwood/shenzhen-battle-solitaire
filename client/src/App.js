import React, { Component } from 'react';
import SolitaireService from './services/SolitaireService';
import GameListComponent from './components/GameList/GameListComponent';
import CreateGameComponent from './components/CreateGame/CreateGameComponent';
import LoginComponent from './components/Login/LoginComponent';
import InGameComponent from './components/InGame/InGameComponent';
import Backdrop from './components/util/Backdrop/Backdrop';
import Modal from './components/util/Modal/Modal';

export default class App extends Component {
  state = {
    username: null,
    selectedGame: null,
    gameList: []
  }

  constructor() {
    super();
    this.service = new SolitaireService();
  }

  componentWillMount() {
    this.socket = this.service.connectIo();
    this.socket.on('solitaire.game.list', (newGameList) => {
      this.setState({
        gameList: newGameList
      })
    });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  userLoggedIn = (user) => {
    this.setState({
      username: user
    });
  }

  createGameClicked = (gameName) => {
    this.service.createGame(this.state.username, gameName, (response) => {
      if (response.error) {
        //TODO: replace alert with something better
        alert(`Could not create game ${response.error}`);
      }
    });
  }

  joinGameClicked = (game) => {
    this.setState({
      selectedGame: game
    });
  }

  deleteGameClicked = (game) => {
    this.service.deleteGame(game.name, (response) => {
      if (response.error) {
        //TODO: replace alert with something better
        alert(`Could not delete game ${response.error}`);
      }
    })
  }

  render() {
    if (!this.state.username) {
      return (
        <LoginComponent loggedIn={this.userLoggedIn} />
      );
    } else if (!this.state.selectedGame) {
      return (
        <div>
          <Backdrop show="true" />
          <Modal>
            <div style={{ textAlign: "center" }}>
              <p className="modal-text">Hello, {this.state.username}.</p>
              <CreateGameComponent clicked={this.createGameClicked} />
              <GameListComponent games={this.state.gameList}
                username={this.state.username}
                joinClicked={this.joinGameClicked}
                deleteClicked={this.deleteGameClicked} />
            </div>
          </Modal>
        </div >
      );
    } else if (this.state.selectedGame) {
      return (
        <div>
          <InGameComponent username={this.state.username}
            game={this.state.selectedGame} />
        </div>
      )
    }
  }
}