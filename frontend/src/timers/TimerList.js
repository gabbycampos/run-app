// Timer 
import React, { useState, useEffect } from 'react';
import { Duration } from 'luxon';

function TimerList() {
    const [timer, setTimer] = useState(1);
    const [timerOn, setTimerOn] = useState(false);
    const [timerDone, setTimerDone] = useState(true);
    const [cycleType, setCycleType] = useState("Run!");
    const [cycleNumber, setCycleNumber] = useState(3);

    // const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const incrementTimer = () => setTimer(timer + 1);
    let decrementTimer = () => setTimer(timer - 1);

    if (timer <= 0) {
        decrementTimer = () => setTimer(1);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerOn) {
                setTimer((timer) => timer - 1);
            }
        }, 1000);
        if (timerOn) {
            setTimerDone(false);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timerOn]);

    useEffect(() => {
        if (timer === 0) {
            setTimerOn(false);
            setTimerDone(true);
            setCycleType((prev) => {
                if (prev === "Run!") return "Walk!";
                if (prev === "Walk!") return "Run!";
                if (prev === "Work Out Completed!") return "Run!"
            })
        }
    }, [timer]);

    useEffect(() => {
        if (cycleType === "Run!") {
            setTimer(10);
        }
        if (cycleType === "Walk!") {
            setTimer(5);
        }
        if (cycleType === "Work Out Completed!") {
            console.log('need to end cycle and repeat until cycleNumber is 0')
        }
        if (cycleType === "Run" && timerDone) {
            setCycleNumber((num) => num - 1);
        }
    }, [cycleType, timerDone]);

    useEffect(() => {
        if (cycleNumber === 0) {
            setCycleType("Work Out Completed!");
            setCycleNumber(3);
        }
    }, [cycleNumber]);

    return (
        <div>
            <div>
                <button onClick={() => incrementTimer()}> + </button>
                <p>Duration: {Duration.fromObject({ seconds: timer }).toFormat("mm:ss")}</p>
                <button onClick={() => decrementTimer()}> - </button>
            </div>
            
            <div>
                <button onClick={() => setTimerOn(!timerOn)}>
                    {timerOn ? "Pause" : "Start"}
                </button>
                <p>{timerDone ? "Done!" : "Let's Run!"} </p>
                <p>{cycleType}</p>
                <p>Cycle Number: {cycleNumber}</p>
            </div>
        </div>
    )
}
export default TimerList;