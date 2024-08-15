
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuizzService } from '../../../../services/ApiServices';

const ModalDeleteQuizz = (props) => {
  const {show, setShow, dataQuizz, fetchListQuizz} = props;

  const handleClose = () => setShow(false);

  const handleClickBtnDeleteQuizz = async() => {
    let data = await deleteQuizzService(dataQuizz.id)//gọi hàm xóa user từ services
    console.log(data);
    //Kiểm tra kết quả trả về
    if(data && data.EC === 0){
      toast.success(data.EM);//Thành công
      handleClose();
      await fetchListQuizz();
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
        <Modal.Body>Bạn có chắc muốn xóa tài khoản <b>{dataQuizz.name}</b> này không ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {handleClickBtnDeleteQuizz()} }>
            Agree
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  );
}

export default ModalDeleteQuizz;