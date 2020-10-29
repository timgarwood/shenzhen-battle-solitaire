import React, { Component } from 'react';
import './SolvedComponent.css';
import Modal from '../../util/Modal/Modal';

export default class SolvedComponent extends Component {
    render() {
        let comps = this.props.usersSolved.map(u => {
            return (
                <div id={u.username} className="SolvedComponent">
                    <div className="solved-list-item-child">
                        <text className="modal-text">{u.username}</text>
                    </div>
                    <div className="solved-list-item-child">
                        <text className="modal-text">{u.startTime}</text>
                    </div>
                    <div className="solved-list-item-child">
                        <text className="modal-text">{u.endTime}</text>
                    </div>
                    <div className="solved-list-item-child">
                        <text className="modal-text">{u.endTime - u.startTime}</text>
                    </div>
                </div>
            );
        });

        return (
            <Modal>
                <div className="SolvedComponent">
                    <div className="solved-list-item-child">
                        <text className="modal-text">Player</text>
                    </div>
                    <div className="solved-list-item-child">
                        <text className="modal-text">Start</text>
                    </div>
                    <div className="solved-list-item-child">
                        <text className="modal-text">End</text>
                    </div>
                    <div className="solved-list-item-child">
                        <text className="modal-text">Elapsed</text>
                    </div>
                    {comps}
                </div>
            </Modal>
        );
    }
}