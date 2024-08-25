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
        console.log('Click me')

        //merge state => react class
        this.setState({
            name: 'Phan',
            age: Math.floor((Math.random() * 100) + 1)
        })
        this.setState({

        })

    }
    handleOnMoverOver(event) {
        // console.log(event.pageX)
    }
    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
                <button onMouseOver={(event) => { this.handleOnMoverOver(event) }}>Hover me</button>
                <button onClick={(event) => { this.handleClick(event) }}>Click me</button>

            </div>
        );
    }
}

export default MyComponent;