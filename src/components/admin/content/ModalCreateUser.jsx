import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from 'axios';

const ModalCreateUser = (props) => {
  const {show, setShow} = props;

  const handleClose = () => {
    setShow(false)
    setEmail("")
    setPassword("")
    setUserName("")
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");


  const handleUploadImage = (e) => {
    if(e.target && e.target.files && e.target.files[0]){
      setPreviewImage(URL.createObjectURL(e.target.files[0])) ;
      setImage(e.target.files[0]); // Gán giá trị url hiện tại cho Image
    }else{
      //setPreviewImage("")
    }
    //Trong trường hợp ko upload ảnh thì hiện chữ PreviewImage
  }

  //hàm để thêm dữ liệu vào backend
  const handleSubmitCreateUser = async() => {
    //gồm 2 việc
    //1.Kiểm tra thông tin nhập vào có đúng hay thiếu không
    //2.call API
    //let data = {
     // email: email,
     // password: password,
     // username: username,
     // role: role,
     // userimage: image
    // };

    //Lấy data từ các state
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userimage', image);
    let respone = await axios.post('http://localhost:8081/api/v1/participant', data); // Đẩy dữ liệu lên bằng axios
    console.log(respone);
    alert("thanh cong")
  }

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>*/}

      <Modal className='modal-add-user' backdrop="static" size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="col-md-8">
                    <label className="form-label">UserName</label>
                    <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select" onChange={(e) => setRole(e.target.value)}>
                      <option value={"USER"}>USERS</option>
                      <option value={"ADMIN"}>ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='labelUpload'>
                      <BsFillPlusCircleFill />
                      Upload Image
                      </label>
                    <input type="file" id='labelUpload' hidden onChange={(e) => handleUploadImage(e)}/>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleSubmitCreateUser()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;