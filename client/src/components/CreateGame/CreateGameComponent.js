import React, { Component } from 'react';
import '../util/Modal/Modal.css';

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
                <p className="modal-text">Create a new game</p>
                <p>
                    <input className="modal-input" type="text" onChange={this.gameNameChanged}></input>
                    <button className="modal-button"
                        style={{ width: "30px", marginLeft: "5px" }}
                        onClick={(evt) => {
                            if (this.state.gameName && this.state.gameName !== '') {
                                this.props.clicked(this.state.gameName);
                            }
                        }}>+</button>
                </p>
            </div>
        )
    }
}