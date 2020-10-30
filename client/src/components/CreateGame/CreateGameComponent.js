import React, { Component } from 'react';
import '../util/Modal/Modal.css';

export default class CreateGameComponent extends Component {
    state = {
        gameName: "",
        disabled: false
    }

    gameNameChanged = (evt) => {
        this.setState({
            gameName: evt.target.value,
            disabled: evt.target.value.length > 25
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
                        disabled={this.state.disabled}
                        onClick={(evt) => {
                            if (this.state.gameName && this.state.gameName !== '') {
                                this.props.clicked(this.state.gameName);
                            }
                        }}>+</button>
                </p>

                {this.state.disabled &&
                    <p style={{ color: "red" }}>
                        Game name cannot exceed 25 characters
                        </p>
                }
            </div>
        )
    }
}