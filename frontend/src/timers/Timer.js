import React from 'react';
import TimerSetUp from './TimerSetUp';
import './Timer.css';
import haversine from 'haversine-distance';
import RunAppApi from '../api/api';
import UserContext from '../auth/UserContext';

class Timer extends React.Component {
    static contextType = UserContext;
    constructor() {
        super();

        this.state = {
            walkTimer: 1,
            runTimer: 2,
            cycleNumber: 3,
            timerCount: 2 * 60,
            cycleType: 'RUN',
            runActive: false,
            coordinates: [],

            distance: 0,
            pace: 0,
            duration: 0,
            currentGeolocation: {longitude: 0, latitude: 0},
            timeStart: ''
        }
        // loop timer until cycle ends
        this.loop = undefined;
        this.audio = document.getElementById('beep');
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    componentDidMount() {
        // react will fire when component mounts
        // can have it here so it watches geolocation all the time
        navigator.geolocation.watchPosition(
            data => {
                this.setState({
                    ...this.state,
                    currentGeolocation: data.coords
                    // store current in a variable 
                });
                // console.log(this.state.currentGeolocation)
                // console.log(data);
                // console.log(data.coords.latitude)
            }, error => console.log(error)
        )
    }
    // then send  whatever data I need to db when run ends

    // hook to handle isActive state
    handleStart = () => {
        const { isActive } = this.state;

        if (isActive) {
            clearInterval(this.loop);

            this.setState({
                isActive: false
            });

        } else {
            this.setState({
                isActive: true,
                timeStart: new Date()
            });

            this.loop = setInterval(() => {
                const { timerCount, cycleType, walkTimer, runTimer, cycleNumber, coordinates, currentGeolocation } = this.state;

                if (cycleNumber === 0) {
                    clearInterval(this.loop);
                }
                if (timerCount === 0) {
                    this.setState({
                        ...this.state,
                        cycleNumber: cycleType === 'WALK' && cycleNumber !== 0 ? cycleNumber - 1 : cycleNumber,
                        cycleType: (cycleType === 'RUN') ? 'WALK' : 'RUN',
                        timerCount: (cycleType === 'RUN') ? (walkTimer * 60) : (runTimer * 60),
                    });
                    this.audio.play()
                } else {
                    this.setState({
                        ...this.state,
                        timerCount: timerCount - 1,
                        coordinates: [...coordinates, {
                            longitude: currentGeolocation.longitude,
                            latitude: currentGeolocation.latitude
                        }],
                    });
                    console.log(coordinates);
                }
            }, 1000);
        }
    }

    // stop / reset timer and post to db
    handleStop = async (event) => {
        event.preventDefault();
        const { coordinates, timeStart } = this.state;
        let first = { lng: coordinates[0].longitude, lat: coordinates[0].latitude }
        let last = { lng: coordinates[coordinates.length - 1].longitude, lat: coordinates[coordinates.length - 1].latitude }

        // DURATION
        let timeEnd = new Date()
        let diff = (timeEnd.getTime() - timeStart.getTime());
        let minutes = Math.floor(diff / 60000);
        let seconds = ((diff % 60000) / 1000).toFixed(0);
        let time = (minutes * 60) + seconds
        // let speed = (time / (haversine(first, last) * 0.62137).toFixed(2))
        
        // start time: 1629994810557 9:20
        // end time: 1629994922192 9:22
    
        // DISTANCE & PACE
        let speed = '';
        let d = haversine(first, last) * 0.000621371192;
        if (d === 0) {
            speed = 0;
        } else {
            speed = (time / (haversine(first, last) * 0.000621371192)); // for pace
        }
        //console.log('speed', time, haversine(first, last) * 0.000621371192);
        // let s = ((haversine(first, last) * 0.000621371192) / time) // for distance (alt)
        let min = Math.floor(speed / 60000);
        let sec = ((speed % 60000) / 1000).toFixed(0);
        //return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        // console.log(first, last);
        // let start = {lng: -116.91876668493907, lat: 33.76077359545395}
        // let end = {lng: -116.91477195370655, lat: 33.75448239039048}
        //console.log((haversine(first, last) * 0.000621371192).toFixed(2))

        if (this.state.isActive === true || this.state.cycleNumber === 0) {
            
            // UPDATE state
            const newState = {
                ...this.state,
                walkTimer: 1,
                runTimer: 2,
                cycleNumber: 3,
                timerCount: 2 * 60,
                cycleType: 'RUN',
                runActive: false,
                distance: (haversine(first, last) * 0.000621371192).toFixed(2),
                duration: (minutes) + ":" + (seconds < 10 ? '0' : '') + seconds,
                pace: (min) + ":" + (sec < 10 ? '0' : '') + sec,
                coordinates: [...coordinates]
            };
            
            this.setState(newState)

            clearInterval(this.loop);
            
            // SEND TO DB
            return await RunAppApi.saveRun({
                day: new Date(),
                userId: this.context.currentUser.users.username,
                distance: newState.distance,
                pace: newState.pace,
                duration: newState.duration,
                coordinates: newState.coordinates
            });
        }  
    }

    // handle time conversion
    convertToTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;

        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return `${minutes}:${seconds}`;
    }

    handleWalkDecrease = () => {
        const { walkTimer, isActive, cycleType } = this.state;
        if (walkTimer > 1) {
            if (!isActive && cycleType === 'WALK') {
                this.setState({
                    walkTimer: walkTimer - 1,
                    timerCount: (walkTimer - 1) * 60,
                })
            } else {
                this.setState({
                    walkTimer: walkTimer - 1,
                });
            }
        }
    }
    handleWalkIncrease = () => {
        const { walkTimer, isActive, cycleType } = this.state;
        if (!isActive && cycleType === 'WALK') {
            this.setState({
                walkTimer: walkTimer + 1,
                timerCount: (walkTimer + 1) * 60
            })
        } else {
            this.setState({
                walkTimer: walkTimer + 1
            });
        }
    }
    handleRunDecrease = () => {
        const { runTimer, isActive, cycleType } = this.state;
        if (runTimer > 1) {
            if (!isActive && cycleType === 'RUN') {
                this.setState({
                    runTimer: runTimer - 1,
                    timerCount: (runTimer - 1) * 60
                })
            } else {
                this.setState({
                    runTimer: runTimer - 1
                });
            }
        }
    }
    handleRunIncrease = () => {
        const { runTimer, isActive, cycleType } = this.state;
        if (!isActive && cycleType === 'RUN') {
            this.setState({
                runTimer: runTimer + 1,
                timerCount: (runTimer + 1) * 60
            })
        } else {
            this.setState({
                runTimer: runTimer + 1
            });
        }
    }
    handleCycleDecrease = () => {
        const { cycleNumber, isActive } = this.state;
        if (cycleNumber > 1) {
            if (!isActive) {
                this.setState({
                    cycleNumber: cycleNumber - 1,
                })
            } else {
                this.setState({
                    cycleNumber: cycleNumber - 1
                });
            }
        }
    }
    handleCycleIncrease = () => {
        const { cycleNumber, isActive } = this.state;
        if (!isActive) {
            this.setState({
                cycleNumber: cycleNumber + 1,
            })
        } else {
            this.setState({
                cycleNumber: cycleNumber + 1
            });
        }
    }

    render() {
        const cycleProps = {
            title: 'Cycle Number',
            count: this.state.cycleNumber,
            handleDecrease: this.handleCycleDecrease,
            handleIncrease: this.handleCycleIncrease
        }
        const walkProps = {
            title: 'Walk Minutes',
            count: this.state.walkTimer,
            handleDecrease: this.handleWalkDecrease,
            handleIncrease: this.handleWalkIncrease
        }
        const runProps = {
            title: 'Run Minutes',
            count: this.state.runTimer,
            handleDecrease: this.handleRunDecrease,
            handleIncrease: this.handleRunIncrease
        }

        return (
            <div className="timer">
                <div className="card-body">
                    <h2 className="card-title">{this.state.cycleType}</h2>
                    <p className="time">{this.convertToTime(this.state.timerCount)}</p>
                    <button className="btn btn-warning" onClick={this.handleStart}>{`${this.state.isActive ? 'Pause' : 'Start'}`}</button>
                    <button className="btn btn-warning" onClick={this.handleStop}>{`${this.state.cycleNumber === 0 ? 'Save' : 'Stop'}`}</button>
                    {/* <h1>{this.state.distance}</h1>
                    <h1>{this.state.duration}</h1>
                    <h1>{this.state.pace}</h1> */}
                </div>
                <div className="timers">
                    <TimerSetUp {...cycleProps} />
                    <TimerSetUp {...walkProps} />
                    <TimerSetUp {...runProps} />
                </div>

            </div>
        )
    }
}

export default Timer;