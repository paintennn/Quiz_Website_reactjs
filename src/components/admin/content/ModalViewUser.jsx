import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalViewUser = (props) => {
  const {show, setShow, dataUser} = props;

  const handleClose = () => {
    setShow(false)
  };

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  //Thực hiện gọi useEffect để nó thwucj hiện chạy lại sau mỗi lần click update mỗi user riêng biệt.
  useEffect(() => {
    console.log("Run UseEffect dataUpdate", dataUser)
    if(!_.isEmpty(dataUser)){//Dùng lodash để kiểm tra modal xem có có rỗng hay không, nếu khoogn rỗng thì set giá trị của user muốn thay đổi cho modal.
        setEmail(dataUser.email)
        setUserName(dataUser.username)
        setRole(dataUser.role);
        if(dataUser.image){
            setPreviewImage(`data:image/jpg;base64,${dataUser.image}`)
        }
    }
  },[dataUser]);
  return (
    <>
      <Modal className='modal-add-user' size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <input type="email" disabled className="form-control" value={email} />
                </div>
                <div className="col-md-12">
                    <label className="form-label">UserName</label>
                    <input disabled type="text" className="form-control" value={userName} />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Role</label>
                    <input disabled type="text" className="form-control" value={role} />
                </div>
                <div className='col-md-12 img-preview'>
                  {previewImage ? //Nếu previewimage có tồn tại url thì truyền cho Img
                    <img src={previewImage} alt=""></img>
                    ://Nếu không thì hiển thị span
                    <span>Preview Image</span>
                  }
                </div>
            </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalViewUser;