import React, { Component } from 'react';
import './Backdrop.css';

export default class Backdrop extends Component {
    render() {
        if (this.props.show) {
            return (
                <div className="Backdrop">
                </div>
            );
        }

        return null;
    }
}