import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
    render() {
        return (
            <div className="Modal">
                {this.props.children}
            </div>
        )
    }
}