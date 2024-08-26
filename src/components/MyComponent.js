// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";


//class component
class MyComponent extends React.Component {


    //JSX
    render() {
        const myInfor = ['a', 'b', 'c']
        return (
            <div>
                <UserInfor />
                <br />
                <br />
                <DisplayInfor name='Phan Huu Thinh' age='50' />
                <hr />
                <DisplayInfor name='pain' age={20} myInfor={myInfor} />
            </div>
        );
    }
}

export default MyComponent;