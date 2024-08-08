import { deleteUserService } from '../../../services/ApiServices';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
  const {show, setShow, dataUser} = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async() => {
    let data = await deleteUserService(dataUser.id)//gọi hàm xóa user từ services
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
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa tài khoản <b>{dataUser.email}</b> này không ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handleSubmitDeleteUser()} }>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;