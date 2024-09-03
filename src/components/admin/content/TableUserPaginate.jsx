import ReactPaginate from 'react-paginate';


const TableUserPaginate = (props) =>{

    const {listUsers, pageCount} = props;

   
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}}`);
        props.fetchListUsersPaginate(+event.selected + 1);
    };

    return(
        <>
           <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
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
                                 <th scope="row">{user.id}</th>
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
           <div className='user-paginate d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
           </div>
        </>
    )
}
export default TableUserPaginate;