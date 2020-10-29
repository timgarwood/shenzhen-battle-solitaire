import React, { Component } from 'react';
import Backdrop from '../util/Backdrop/Backdrop';
import Modal from '../util/Modal/Modal';
import './LoginComponent.css';
import '../util/Modal/Modal';

export default class LoginComponent extends Component {
    state = {
        loginName: ""
    };

    onInputChange = (evt) => {
        this.setState({
            loginName: evt.target.value
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
                        <p></p>
                        <button className="modal-button" onClick={() => this.props.loggedIn(this.state.loginName)}>Proceed</button>
                    </div>
                </Modal>
            </div >
        );
    }
}