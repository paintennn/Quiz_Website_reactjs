// class component
// function component
import React, { useState } from "react";
import { applyMiddleware } from "redux";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";


//class component
// class MyComponent extends React.Component {

//     state = {
//         listUsers: [
//             { id: 1, name: 'Phan Huu Thinh', age: '16' },
//             { id: 2, name: 'pain', age: '26' },
//             { id: 3, name: 'Thuan', age: '69' }
//         ]
//     }

//     handleAddNewUser = (userObj) => {
//         // let listUsersNew = [...this.state.listUsers]
//         // listUsersNew.unshift(userObj)
//         // this.setState({
//         //     listUsers: listUsersNew
//         // })
//         this.setState({
//             listUsers: [userObj, ...this.state.listUsers] //add first list
//             // listUsers: [...this.state.listUsers,userObj] //add last list
//         })
//     }

//     handleDeleteUser = (userId) => {
//         let listUsersClone = [...this.state.listUsers]
//         listUsersClone = listUsersClone.filter(item => item.id !== userId)
//         this.setState({
//             listUsers: listUsersClone
//         })
//     }
//     //JSX
//     render() {
//         //dry: don't repeat yourseft
//         return (

//             //fragment
//             <>
//                 <div className="a">
//                     <AddUserInfor
//                         handleAddNewUser={this.handleAddNewUser}
//                     />
//                     <br />
//                     <br />
//                     <DisplayInfor
//                         listUsers={this.state.listUsers}
//                         handleDeleteUser={this.handleDeleteUser}
//                     />
//                 </div>

//                 <div className="b"></div>
//             </>
//         );
//     }
// }

const MyComponent = (props) => {

    const [listUsers, setListUsers] = useState(
        [
            { id: 1, name: 'Phan Huu Thinh', age: '16' },
            { id: 2, name: 'pain', age: '26' },
            { id: 3, name: 'Thuan', age: '69' }
        ]
    )
    const handleAddNewUser = (userObj) => {
        setListUsers([userObj, ...listUsers])
    }

    const handleDeleteUser = (userId) => {
        let listUsersClone = [...listUsers]
        listUsersClone = listUsersClone.filter(item => item.id !== userId)
        setListUsers(listUsersClone)
    }
    //dry: don't repeat yourseft
    return (

        //fragment
        <>
            <div className="a">
                <AddUserInfor
                    handleAddNewUser={handleAddNewUser}
                />
                <br />
                <br />
                <DisplayInfor
                    listUsers={listUsers}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>

            <div className="b"></div>
        </>
    );
}

export default MyComponent;