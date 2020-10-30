import React, { Component } from 'react';
import './SolvedComponent.css';
import Modal from '../../util/Modal/Modal';

export default class SolvedComponent extends Component {
    render() {
        let comps = this.props.usersSolved.map((u, i, obj) => {
            let endText = null;
            let diffText = null;
            if (u.endTime) {
                endText = u.endTime
                diffText = u.endTime - u.startTime;
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
                        <text className="modal-text">{u.startTime}</text>
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
                        <text className="modal-text">Elapsed</text>
                    </div>
                </div>
                {comps}
            </Modal>
        );
    }
}