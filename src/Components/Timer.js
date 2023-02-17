import React from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import './Timer.css'


class Timer extends React.Component {

    constructor(props) {
        super();
        this.state = {
            time: props.time, // ms.
            timeLeft: props.time, // ms.
            isRun: props.autostart ? true : false, // if 'autostart' doesn't exist  
            step: props.step ? props.step : 1000, // ms.
            autostart: props.autostart,
            onTick: props.onTick,
            onTimeEnd: props.onTimeEnd,
            onTimeStart: props.onTimeStart,
            onTimePause: props.onTimePause
        }
    }

    componentDidMount() {
        const timerInterval = setInterval(() => {
            if (this.state.isRun) {
                if (this.state.timeLeft <= 0) {
                    this.setState({ isRun: false});
                    clearInterval(timerInterval);
                } else {
                    this.setState({ timeLeft: this.state.timeLeft - this.state.step });
                    if (this.state.onTick) {
                        this.state.onTick(this.state.timeLeft / 1000);
                    };
                }

            }
        },
            this.state.step
        );

    }

    startTimer() {
        this.setState({ isRun: true });
        if (this.state.onTimeStart) {
            this.state.onTimeStart();
        };
    }

    pauseTimer() {
        if (this.state.isRun) {
            this.setState({ isRun: !this.state.isRun })
            if (this.state.onTimePause) {
                this.state.onTimePause();
            };
        } else {
            this.startTimer();    
        }
    }

    resetTimer() {
        this.setState({ isRun: this.state.autostart, timeLeft: this.state.time })
        if (this.state.onTimeEnd) {
            this.state.onTimeEnd();
        };
    }

    render() {

        return (
            <div className='block-timer' >
                <div>
                    <button className='button-timer' onClick={this.startTimer.bind(this)}>Start</button>
                    <button className='button-timer' onClick={this.pauseTimer.bind(this)}>Pause</button>
                    <button className='button-timer' onClick={this.resetTimer.bind(this)}>Reset</button>
                </div>
                <p> The Timer is running 
                    <label className='text-timer-state'> {this.state.isRun.toString()}</label> 
                </p>
                <p> Speed is {this.state.step / 1000} sec. </p>
                <p> Time left {this.state.timeLeft / 1000} sec. </p>
                <CountdownCircleTimer
                    key={((this.state.timeLeft === this.state.time && !this.state.isRun) ? 0 : 1)}
                    isPlaying={this.state.isRun}
                    remainingTime={this.state.timeLeft}
                    duration={this.state.time / 1000}
                    updateInterval={(this.state.step === 1000 ? 0 : this.state.step / 1000)}
                    trailColor={'#FFE600'}
                    colors={['#FFE600', '#02A4FF']}
                    colorsTime={[(this.state.time / 2), 0]}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>

            </div>
        )
    }

}

export default Timer