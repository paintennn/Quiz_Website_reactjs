import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { BsFillPlusCircleFill } from "react-icons/bs";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsersService } from "../../../services/ApiServices";
const ManageUser = (props) => {
    
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    const [listUsers, setListUsers] = useState([]);
    const fetchListUsers = async() =>{
        let res = await getAllUsersService()// Gọi hàm lấy user từ services

        if(res.EC === 0){//lấy dữ liệu thành công
            setListUsers(res.DT);// set dữ liệu cho state để hiển thị
        }else{//lấy dữ liệu không thành công

        }
    }
    //ComponentDidmount
    useEffect(() =>{
            fetchListUsers();
    },[])



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
                        <TableUser listUsers={listUsers}/>
                    </div>
                    <ModalCreateUser 
                        show={showModalCreateUser} 
                        setShow={setShowModalCreateUser}
                        fetchListUsers={fetchListUsers}/>
                </div>
            </div>
        </>
    )
}
export default ManageUser;