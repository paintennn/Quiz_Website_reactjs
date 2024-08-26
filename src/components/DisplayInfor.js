import React from "react";

class DisplayInfor extends React.Component {
    render() {

        //destructuring array/object
        const { age, name } = this.props;//object
        //prop
        return (
            <div>
                <div>My name is: {name}</div>
                <div>My age is: {age}</div>
            </div>
        )
    }
}

export default DisplayInfor