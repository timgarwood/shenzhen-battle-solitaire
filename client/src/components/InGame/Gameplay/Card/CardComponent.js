import React, { Component } from 'react';
import red1 from '../../../../images/red-1.png';

export default class CardComponent extends Component {
    render() {
        let imgDiv = null;
        if (this.props.imgSrc) {
            imgDiv = (
                <img src={this.props.imgSrc} />
            );
        }

        return (
            <div
                className="card"
                style={{ top: this.props.y, left: this.props.x, zIndex: this.props.z, pointerEvents: this.props.z == 100 ? "none" : "auto" }}
                onDoubleClick={this.props.onDoubleClick}
                onMouseOver={this.props.onMouseEnter}
                onMouseOut={this.props.onMouseLeave}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
            >
                {imgDiv}
            </div>
        )
    }
}