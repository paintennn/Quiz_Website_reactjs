// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";


//class component
class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: 'Phan Huu Thinh', age: '50' },
            { id: 2, name: 'pain', age: '24' },
            { id: 3, name: 'Thuan', age: '11' }
        ]
    }
    //JSX
    render() {
        //dry: don't repeat yourseft
        return (
            <div>
                <UserInfor />
                <br />
                <br />
                <DisplayInfor listUsers={this.state.listUsers} />
            </div>
        );
    }
}

export default MyComponent;