import React, { Component } from 'react';
import red1 from '../../../../images/red-1.png';

export default class CardComponent extends Component {
    render() {
        return (
            <div className="card" style={{ top: this.props.top, left: this.props.left }}>
                <img src={this.props.imgSrc} />
            </div>
        )
    }
}