import React, { Component } from 'react';

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
                <input type="text" onChange={this.onInputChange}></input>
                <button onClick={() => this.props.loggedIn(this.state.loginName)}>Enter</button>
            </div>
        );
    }
}