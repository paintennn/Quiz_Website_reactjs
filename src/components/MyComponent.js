// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";


//class component
class MyComponent extends React.Component {

    state = {
        name: 'Thinh',
        address: 'HCM',
        age: 20
    };

    handleClick(event) {
        console.log('Click me')

        //merge state => react class
        this.setState({
            name: 'Phan',
            age: Math.floor((Math.random() * 100) + 1)
        })
        // this.setState({
        //     age: Math.floor((Math.random() * 100) + 1)
        // })

    }
    handleOnMoverOver(event) {
        // console.log(event.pageX)
    }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
        console.log(event, event.target.value)
    }
    handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }
    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input
                        onChange={(event) => this.handleOnChangeInput(event)}
                        type="text" />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;