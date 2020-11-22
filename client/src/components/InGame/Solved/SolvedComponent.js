import React, { Component } from 'react';
import './SolvedComponent.css';
import Modal from '../../util/Modal/Modal';
import '../../util/Modal/Modal.css';

export default class SolvedComponent extends Component {
    render() {
        let comps = this.props.usersSolved.map((u, i, obj) => {
            let startDate = new Date(u.startTime);
            let startText = startDate.toUTCString();

            let endDate = null;
            let endText = null;
            let diffText = null;
            if (u.endTime) {
                endDate = new Date(u.endTime);
                endText = endDate.toUTCString();

                let ms = endDate - startDate;

                let hours = ms / (1000 * 60 * 60);
                let mins = (hours - Math.floor(hours)) * 60;
                hours = Math.floor(hours);

                let secs = (mins - Math.floor(mins)) * 60;
                mins = Math.floor(mins);

                ms = (secs - Math.floor(secs)) * 1000;

                secs = Math.floor(secs);
                ms = Math.floor(ms);

                diffText = `${hours}:${mins}:${secs}.${ms}`;

            } else {
                endText = "has not finished";
                diffText = "N/A";
            }

            let rowClass = "solved-list-row-grey";
            if (i % 2 != 0) {
                rowClass = "solved-list-row-white";
            }

            return (
                <div id={u.username} className={rowClass}>
                    <div className="solved-list-col">
                        <text className="modal-text">{u.username}</text>
                    </div>
                    <div className="solved-list-col">
                        <text className="modal-text">{startText}</text>
                    </div>
                    <div className="solved-list-col">
                        <text className="modal-text">{endText}</text>
                    </div>
                    <div className="solved-list-col">
                        <text className="modal-text">{diffText}</text>
                    </div>
                </div>
            );
        });

        return (
            <Modal>
                <div style={{ textAlign: "center" }}>
                    <p>
                        You solved it!
                    </p>
                    <p>
                        <button className="modal-button"
                            onClick={this.props.startGame}>Play Again</button>
                    </p>
                    <p>
                        Current results:
                    </p>
                </div>

                <div className="solved-list-row-grey">
                    <div className="solved-list-col">
                        <text className="modal-text">Player</text>
                    </div>
                    <div className="solved-list-col">
                        <text className="modal-text">Start</text>
                    </div>
                    <div className="solved-list-col">
                        <text className="modal-text">End</text>
                    </div>
                    <div className="solved-list-col">
                        <text className="modal-text">Elapsed (hh:mm:ss.ms)</text>
                    </div>
                </div>
                {comps}
            </Modal>
        );
    }
}