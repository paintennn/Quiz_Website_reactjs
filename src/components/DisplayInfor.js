import React from "react";
import './DisplayInfor.scss'
import logo1 from './../logo.svg'
class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true
    }

    componentDidMount() {
        console.log('Call me component did mount')
        setTimeout(() => {
            document.title = 'ThinhPhan'
        }, 3000)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Call me component did update', this.props, prevProps)
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

        //component js: template + logic js
        return (
            <div className="display-infor-container">
                {/* <img src={logo1} /> */}
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
                                    <div>
                                        <div>My name is: {user.name}</div>
                                        <div>My age is: {user.age}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
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
}

export default DisplayInfor