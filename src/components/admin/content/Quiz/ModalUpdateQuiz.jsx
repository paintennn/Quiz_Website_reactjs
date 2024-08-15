import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import Select from 'react-select';
import _ from 'lodash';
import { putUpdateQuizz } from '../../../../services/ApiServices';


const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];
const ModalUpdateQuizz = (props) => {
  const {show, setShow, dataQuizz} = props;

  const handleClose = () => {
    setShow(false)
    setName("")
    setDescription("")
    setType("")
    setImage(null)
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Easy");
  const [image, setImage] = useState(null);

  //Thực hiện gọi useEffect để nó thwucj hiện chạy lại sau mỗi lần click update mỗi user riêng biệt.
  useEffect(() => {
    console.log("Run UseEffect dataUpdate", dataQuizz)
    if(!_.isEmpty(dataQuizz)){//Dùng lodash để kiểm tra modal xem có có rỗng hay không, nếu khoogn rỗng thì set giá trị của user muốn thay đổi cho modal.
        setName(dataQuizz.name)
        setDescription(dataQuizz.description)
        setType(dataQuizz.type)
        setImage(dataQuizz.image)
    }
  },[dataQuizz]);

  //hàm để cập nhật thay đổi dữ liệu vào backend
  const handleSubmitUpdateQuizz = async() => {
    //gồm 2 việc
    //1.Kiểm tra thông tin nhập vào có đúng hay thiếu không
    //2.call API
    let data = await putUpdateQuizz(dataQuizz.id, name, description, type, image)//gọi hàm thêm user từ services
    console.log(data);
    //Kiểm tra kết quả trả về
    if(data && data.EC === 0){
      toast.success(data.EM);//Thành công
      handleClose();
      await props.fetchListQuizz();
    }
    else{
      toast.error(data.EM);//Thất bại
    }
  }

  return (
    <>
      <Modal className='modal-add-user' backdrop="static" size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quizz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="title">
                            Manage Quizz
                        </div>
                        <hr></hr>
                    </Accordion.Header>
                    <Accordion.Body>
                    <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Update Quizz</legend>
                                    <div className="form-floating mb-3">
                                    <input 
                                        value={name} 
                                        onChange={(event) => setName(event.target.value)}
                                        type="text" 
                                        className="form-control" 
                                        placeholder='Your Quizz name'
                                    />
                                    <label for="floatingInput">Name</label>
                                </div>
                                <div className="form-floating">
                                    <input 
                                        value={description} 
                                        onChange={(event) => setDescription(event.target.value)} 
                                        type="text" 
                                        className="form-control"  
                                        placeholder='Description'
                                    />
                                    <label for="floatingInput">Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                    //Đây là thư viện select 
                                        value={options.find(option => option.value === type)}
                                        onChange={(selectedOption) => setType(selectedOption.value)}
                                        options={options}
                                        placeholder={"Quizz Type"}
                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label for="floatingInput" className='mb-1'>Upload Image</label>
                                    <input 
                                        onChange={(event) => props.handelChangeFile(event)}                    
                                        type='file' 
                                        className='form-control'
                                    />
                                
                                </div>
                            </fieldset>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => handleSubmitUpdateQuizz()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateQuizz;