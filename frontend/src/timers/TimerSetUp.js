import React from 'react';
//import { Duration } from 'luxon';

function TimerSetUp(props) {
    return (
        <div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <button className="btn btn-warning timers-btn" onClick={props.handleDecrease}> - </button>
                <span className="count">{props.count}</span>
                <button className="btn btn-warning timers-btn" onClick={props.handleIncrease}> + </button>
            </div>
        </div>
    )
}

export default TimerSetUp;
