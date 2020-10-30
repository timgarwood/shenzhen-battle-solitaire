import React, { Component } from 'react';
import Backdrop from '../util/Backdrop/Backdrop';
import Modal from '../util/Modal/Modal';
import './LoginComponent.css';
import '../util/Modal/Modal';

export default class LoginComponent extends Component {
    state = {
        loginName: "",
        disabled: false
    };

    onInputChange = (evt) => {
        this.setState({
            loginName: evt.target.value,
            disabled: evt.target.value.length > 25
        });
    }

    render() {
        return (
            <div>
                <Backdrop show="true" />
                <Modal>
                    <div style={{ verticalAlign: "center", textAlign: "center" }}>
                        <p className="modal-text">
                            Enter your name:
                    </p>
                        <input className="modal-input" type="text" onChange={this.onInputChange}></input>
                        {this.state.disabled &&
                            <p style={{ color: "red" }}>
                                Name cannot exceed 25 characters
                            </p>
                        }
                        {!this.state.disabled &&
                            <p></p>
                        }
                        <button
                            disabled={this.state.disabled}
                            className="modal-button"
                            onClick={() => this.props.loggedIn(this.state.loginName)}>Proceed</button>
                    </div>
                </Modal>
            </div >
        );
    }
}