import React, { Component } from 'react';
import red1 from '../../../../images/red-1.png';

export default class CardComponent extends Component {
    render() {
        return (
            <div
                className="card"
                style={{ top: this.props.top, left: this.props.left, zIndex: this.props.z, pointerEvents: this.props.z == 100 ? "none" : "auto" }}
                onMouseOver={this.props.onMouseEnter}
                onMouseOut={this.props.onMouseLeave}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
            >
                <img src={this.props.imgSrc} />
            </div>
        )
    }
}