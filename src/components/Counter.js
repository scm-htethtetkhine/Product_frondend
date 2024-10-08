import React, { Component } from 'react'

export class Counter extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            count: 0
        }
    }

    onIncrease() {
    //     this.setState({
    //         count: this.state.count + 1
    //     },
    //     () => {
    //         console.log('Callback value' , this.state.count)
    //     }
    // )
    this.setState(prevState => ({
        count: prevState.count + 1
    }))
    console.log(this.state.count)
    }

    onIncreaseFive() {
        this.onIncrease()
        this.onIncrease()
        this.onIncrease()
        this.onIncrease()
        this.onIncrease()
    }
    
    
    render() {
        return (
            <div>
            <div>
            Count - { this.state.count }
            </div>
            <button onClick={() => this.onIncreaseFive()}>Increment</button>
            </div>
        )
    }
}

export default Counter
