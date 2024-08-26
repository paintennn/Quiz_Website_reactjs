// class component
// function component
import React from "react";
import { applyMiddleware } from "redux";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";


//class component
class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: 'Phan Huu Thinh', age: '16' },
            { id: 2, name: 'pain', age: '26' },
            { id: 3, name: 'Thuan', age: '69' }
        ]
    }

    handleAddNewUser = (userObj) => {
        // let listUsersNew = [...this.state.listUsers]
        // listUsersNew.unshift(userObj)
        // this.setState({
        //     listUsers: listUsersNew
        // })
        this.setState({
            listUsers: [userObj, ...this.state.listUsers]
        })
    }
    //JSX
    render() {
        //dry: don't repeat yourseft
        return (
            <div>
                <AddUserInfor
                    handleAddNewUser={this.handleAddNewUser}
                />
                <br />
                <br />
                <DisplayInfor
                    listUsers={this.state.listUsers}

                />
            </div>
        );
    }
}

export default MyComponent;