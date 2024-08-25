// class component
// function component
import React from "react";


//class component
class MyComponent extends React.Component {

    state = {
        name: 'Thinh',
        address: 'HCM',
        age: 20
    };

    handleClick(event) {
        console.log('Click me my button');
        console.log('My name is ', this.state.name)
    }
    handleOnMoverOver(event) {
        console.log(event.pageX)
    }
    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
                <button onMouseOver={this.handleOnMoverOver}>Hover me</button>
                <button onClick={this.handleClick}>Click me</button>

            </div>
        );
    }
}

export default MyComponent;