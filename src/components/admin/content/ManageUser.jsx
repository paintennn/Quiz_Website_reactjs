import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState } from "react";
const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    return(
        <>
            <div className="manage-user-container">
                <div className="title">
                    Manage User
                </div>
                <div className="user-content">
                    <div className="btn-add-new">
                        <button className="btn btn-primary" type="submit" onClick={() => setShowModalCreateUser(true)}><BsFillPlusCircleFill/>  Add New User</button>
                    </div>
                    
                    <div className="table-user-container">
                        table users
                        
                    </div>
                    <ModalCreateUser 
                        show={showModalCreateUser} 
                        setShow={setShowModalCreateUser}/>
                </div>
            </div>
        </>
    )
}
export default ManageUser;