import React, { useState } from "react";
import './DisplayInfor.scss'
import logo1 from './../logo.svg'
import { unstable_renderSubtreeIntoContainer } from "react-dom";


//stateless vs stateful
// class DisplayInfor extends React.Component {



//     render() {
//         //destructuring array/object
//         const { listUsers } = this.props;//object
//         //prop
//         // console.table(listUsers)

//         //component js: template + logic js
//         return (
//             <div className="display-infor-container">
//                 {true &&
//                     <div>
//                         {listUsers.map((user, index) => {
//                             return (

//                                 <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
//                                     <div>
//                                         <div>My name is: {user.name}</div>
//                                         <div>My age is: {user.age}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>
//                                     <hr />
//                                 </div>
//                             )

//                         })}
//                     </div>
//                 }
//             </div >

//         )
//     }
// }


const DisplayInfor = (props) => {
    const { listUsers } = props;//object
    //destructuring array/object

    //prop
    // console.table(listUsers)

    //component js: template + logic js

    const [isShowHideListUser, setShowHideListUser] = useState(true)
    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }
    return (
        <div className="display-infor-container">
            <div>
                <button onClick={() => handleShowHideListUser()}>
                    {isShowHideListUser === true ? 'Hide List Users' : 'Show List Users'}
                </button>
            </div>
            {isShowHideListUser &&
                <div>
                    {listUsers.map((user, index) => {
                        return (

                            <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                                <div>
                                    <div>My name is: {user.name}</div>
                                    <div>My age is: {user.age}</div>
                                </div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                </div>
                                <hr />
                            </div>
                        )

                    })}
                </div>
            }
        </div >

    )
}
export default DisplayInfor