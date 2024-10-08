
const TableUser = (props) =>{

    const {listUsers} = props;

    return(
        <>
           <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                     listUsers && listUsers.length > 0 && listUsers.map((user, index) =>{
                         return(
                             <tr key={user.id}>
                                 <th scope="row">{index + 1}</th>
                                 <td>{user.username}</td>
                                 <td>{user.email}</td>
                                 <td>{user.role}</td>
                                 <td>
                                    <button type="button" onClick={() => props.handleClickBtnView(user)} className="btn btn-info">Xem Chi tiết</button>
                                    <button type="button" onClick={() => props.handleClickBtnUpdate(user)} className="btn btn-warning mx-3">Sửa</button>
                                    <button type="button" onClick={() => props.handleClickBtnDelete(user)} className="btn btn-danger">Xóa</button>
                                 </td>
                             </tr>
                         )
                     })   
                    }
                    {
                        listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan="4" className="text-center">No data available</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableUser;