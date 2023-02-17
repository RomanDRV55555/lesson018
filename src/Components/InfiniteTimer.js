import { Component } from 'react'
import Timer from './Timer.js'

class InfiniteTimer extends Component {
    state = {
        time: 1000 * 1000 // ms, = 1000s
    }
    onTimeEnd = () => this.setState({ time: 1000 * 1000 })
    onTimeChange = (time) => this.setState({ time })
    
    render() {
        return <Timer time={this.state.time} onTimeChange=
            {this.onTimeChange} onTimeEnd={this.onTimeEnd} step={10000} autostart
        />
    }
}

export default InfiniteTimer    