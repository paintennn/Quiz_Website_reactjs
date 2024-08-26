// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import UserInfor from "./UserInfor";


//class component
class MyComponent extends React.Component {


    //JSX
    render() {
        return (
            <div>
                <UserInfor />
            </div>
        );
    }
}

export default MyComponent;