import React from 'react';
import TimerSetUp from './TimerSetUp';
import './Timer.css';
import haversine from 'haversine-distance';

class Timer extends React.Component {
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

            distance: 1,
            pace: '',
            duration: '',
            currentGeolocation: '',
            timeStart: '',
        }
        // loop timer until cycle ends
        this.loop = undefined;
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
        const { isActive, timeStart } = this.state;
        // let timeStart = new Date().getHours() + ':' + new Date().getMinutes()

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
                } else {
                    this.setState({
                        ...this.state,
                        timerCount: timerCount - 1,
                        coordinates: [...coordinates, currentGeolocation],
                    });
                    console.log(coordinates);
                }

            }, 1000);
        }
    }

    // stop and reset timer
    handleStop = () => {
        const { coordinates, timeStart } = this.state;
        //console.log('lat ', this.state.currentGeolocation.latitude)
        let first = {lat: coordinates[0].latitude, lng: coordinates[0].longitude, time: new Date().getTime() }
        let last = { lat: coordinates[coordinates.length - 1].latitude, lng: coordinates[coordinates.length-1].longitude}
        console.log(first, last);
        // this.setState({
        //     pace: 
        //     duration:
        // let diff = timeStart - timeEnd
        // console.log(timeStart, timeEnd)
       
        let timeEnd = new Date()
        console.log(timeStart)
        console.log(timeEnd)
        //console.log('timeEnd -start', timeEnd.getTime() - timeStart.getTime())
        console.log('timeEnd ', timeEnd.getTime())
        console.log('timeStart ', timeStart.getTime())
        console.log('sub ', timeEnd.getTime() - timeStart.getTime())
        let diff = (timeEnd.getTime() - timeStart.getTime())
        //console.log('diff', new Date(diff).toLocaleTimeString())
        let minutes = Math.floor(diff / 60000);
        let seconds = ((diff % 60000) / 1000).toFixed(0);
        console.log(`${minutes}:${seconds}`)
        //return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

        let time = (minutes * 60) + seconds
        let speed = `${time/this.state.distance}`

        this.setState({
            ...this.state,
            walkTimer: 1,
            runTimer: 2,
            cycleNumber: 3,
            timerCount: 2 * 60,
            cycleType: 'RUN',
            runActive: false,
            distance: haversine(first, last) * 0.000621371192.toFixed(2),
            duration: `${minutes}:${seconds}`,
            pace: speed
        });

        // const minute = Math.floor(( timeEnd % (1000 * 60 * 60)) / (1000 * 60));
        // const second = Math.floor((timeEnd % (1000 * 60)) / 1000);
        //const minutes = ((1627939331250/60000).toFixed(2)).replace('.',':');
        // const minute = Math.floor(( 1627939331250 % (1000 * 60 * 60)) / (1000 * 60));
        // console.log(minute)
     
        // let time = new Date().getTime()
        // console.log('time ', new Date(time).toLocaleTimeString())
        //let start = new Date(timeStart).toLocaleTimeString()
        // let end = new Date(timeEnd).toLocaleTimeString()
        //console.log('elapsed str ',new Date(1627945544936 - 1627945579924).toLocaleString());
     
        clearInterval(this.loop);
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
                    <button className="btn btn-warning" onClick={this.handleStop}>Stop</button>
                    <h1>{this.state.distance}</h1>
                    <h1>{this.state.duration}</h1>
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