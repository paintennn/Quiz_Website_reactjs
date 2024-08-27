import React from "react";
import './DisplayInfor.scss'
import logo from './../logo.svg'
class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true
    }



    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }

    render() {
        //destructuring array/object
        const { listUsers } = this.props;//object
        //prop
        // console.table(listUsers)
        return (
            <div className="display-infor-container">
                <img src={logo} />
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser === true ? 'Hide List User:' : 'Show List User:'}
                    </span>
                </div>
                {this.state.isShowListUser &&
                    <div>
                        {listUsers.map((user, index) => {
                            return (

                                <div key={user.id} className={+user.age > 18 ? 'green' : 'red'}>
                                    <div>My name is: {user.name}</div>
                                    <div>My age is: {user.age}</div>
                                    <hr />
                                </div>
                            )

                        })}
                    </div>
                }
            </div >

        )
    }
}

export default DisplayInfor