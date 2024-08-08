
import './ManageUser.scss';
import { BsFillPlusCircleFill } from "react-icons/bs";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsersService, getUserPaginateService } from "../../../services/ApiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModelUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

const ManageUser = (props) => {
    
    const LIMIT_USER = 10;

    const [pageCount, setPageCount] = useState(0);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    
    const [showModalViewUser, setShowModalViewUser] = useState(false)

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUser, setDataUser] = useState({})

    const [listUsers, setListUsers] = useState([]);
    const fetchListUsers = async() =>{
        let res = await getAllUsersService()// Gọi hàm lấy user từ services

        if(res.EC === 0){//lấy dữ liệu thành công
            setListUsers(res.DT);// set dữ liệu cho state để hiển thị
        }
    }

    //fetch để phân trang
    const fetchListUsersPaginate = async(page) =>{
        let res = await getUserPaginateService(page, LIMIT_USER)// Gọi hàm lấy user từ services với tham số là page và giới hạn user page đó

        if(res.EC === 0){//lấy dữ liệu thành công
            setListUsers(res.DT.users);// set dữ liệu cho state để hiển thị
            setPageCount(res.DT.totalPages);
        }
    }
    //ComponentDidmount
    useEffect(() =>{
        //fetchListUsers();
        fetchListUsersPaginate(1);
    },[])

    //Cập nhật bắt sự kiện nút update. 
    const handleClickBtnUpdate = (user) =>{
        setShowModalUpdateUser(true);
        setDataUser(user);//Set data user lấy được khi click cho state
    }

    //Cập nhật bắt sự kiện nút view, tương tự update
    const handleClickBtnView = (user) =>{
        setShowModalViewUser(true);
        setDataUser(user);//Set data user lấy được khi click cho state
    }
    
    //Cập nhật bắt sự kiện nút delete, tương tự view
    const handleClickBtnDelete = (user) =>{
        setShowModalDeleteUser(true);
        setDataUser(user);//Set data user lấy được khi click cho state
    }
    return(
        <>
            <div className="manage-user-container">
                <div className="title">
                    Manage User
                </div>
                <div className="user-content">
                    <div className="btn-add-new mb-2">
                        <button className="btn btn-primary" type="submit" onClick={() => setShowModalCreateUser(true)}><BsFillPlusCircleFill/>  Add New User</button>
                    </div>
                    
                    <div className="table-user-container">
                        {/*Danh sách không phân trang
                        <TableUser
                            listUsers={listUsers}  
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnView={handleClickBtnView}
                            handleClickBtnDelete={handleClickBtnDelete}
                        />*/}
            
                        <TableUserPaginate 
                            listUsers={listUsers}  
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnView={handleClickBtnView}
                            handleClickBtnDelete={handleClickBtnDelete}
                            fetchListUsersPaginate={fetchListUsersPaginate}
                            pageCount={pageCount}
                        />
                    </div>
                    <ModalCreateUser 
                        show={showModalCreateUser} 
                        setShow={setShowModalCreateUser}
                        fetchListUsers={fetchListUsers}/>
                    <ModalUpdateUser
                        show={showModalUpdateUser}
                        setShow={setShowModalUpdateUser}
                        fetchListUsers={fetchListUsers}
                        dataUser={dataUser}//truyền data user lấy được ở dòng 34 để hiển thị qua trang update
                    />
                    <ModalViewUser
                        show={showModalViewUser}
                        setShow={setShowModalViewUser}
                        dataUser={dataUser}//truyền data user lấy được ở dòng 34 để hiển thị qua trang View
                    />
                    <ModalDeleteUser
                        show={showModalDeleteUser}
                        setShow={setShowModalDeleteUser}
                        fetchListUsers={fetchListUsers}
                        dataUser={dataUser}//truyền data user lấy được ở dòng 34 để hiển thị qua trang Delete
                    />
                </div>
            </div>
        </>
    )
}
export default ManageUser;