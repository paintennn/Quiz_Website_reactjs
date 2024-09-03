import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/ApiServices';
import _ from 'lodash';

const ModalUpdateUser = (props) => {
  const {show, setShow, dataUser} = props;

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

  //Thực hiện gọi useEffect để nó thwucj hiện chạy lại sau mỗi lần click update mỗi user riêng biệt.
  useEffect(() => {
    console.log("Run UseEffect dataUpdate", dataUser)
    if(!_.isEmpty(dataUser)){//Dùng lodash để kiểm tra modal xem có có rỗng hay không, nếu khoogn rỗng thì set giá trị của user muốn thay đổi cho modal.
        setEmail(dataUser.email)
        setPassword(dataUser.password)
        setUserName(dataUser.username)
        setRole(dataUser.role);
        if(dataUser.image){
            setPreviewImage(`data:image/jpg;base64,${dataUser.image}`)
        }
    }
  },[dataUser]);

  const handleUploadImage = (e) => {
    if(e.target && e.target.files && e.target.files[0]){
      setPreviewImage(URL.createObjectURL(e.target.files[0])) ;
      setImage(e.target.files[0]); // Gán giá trị url hiện tại cho Image
    }else{
      //setPreviewImage("")
    }
    //Trong trường hợp ko upload ảnh thì hiện chữ PreviewImage
  }

    //Validate Email
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  //hàm để cập nhật thay đổi dữ liệu vào backend
  const handleSubmitUpdateUser = async() => {
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
    //Validate
    const isValidEmail = validateEmail(email);
    if(!isValidEmail) {
      toast.error("Invalid email address");
      return;
    }
    
    let data = await putUpdateUser(dataUser.id, userName, role, image)//gọi hàm thêm user từ services
    console.log(data);
    //Kiểm tra kết quả trả về
    if(data && data.EC === 0){
      toast.success(data.EM);//Thành công
      handleClose();
      await props.fetchListUsers();
    }
    else{
      toast.error(data.EM);//Thất bại
    }
  }

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>*/}

      <Modal className='modal-add-user' backdrop="static" size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" disabled className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" disabled className="form-control" value={password}  onChange={(e) => setPassword(e.target.value)}/>
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
          <Button variant="success" onClick={() => handleSubmitUpdateUser()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;