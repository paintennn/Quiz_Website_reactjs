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

    //JSX
    render() {
        return (
            <div>
                My name is {this.state.name} and I'm from {this.state.address}
            </div>
        );
    }
}

export default MyComponent;