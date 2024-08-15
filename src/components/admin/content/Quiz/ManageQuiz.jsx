import { useState, useEffect } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { getAllQuiz, postCreateQuiz } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuizz from './ModalUpdateQuiz';
import ModalDeleteQuizz from './ModalDeleteQuizz';
import QuizzQA from './QuizzQA';
import AssignQuizz from './AssignQuizz';

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];
const ManageQuiz = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Easy");
    const [image, setImage] = useState(null);
    const [dataQuizz, setDataQuizz] = useState({})
    const [listQuizz, setListQuizz] = useState([]);
    const [showModalUpdateQuizz, setShowModalUpdateQuizz] = useState(false)
    const [showModalDeleteQuizz, setShowModalDeleteQuizz] = useState(false)

    const fetchListQuizz = async() =>{
        let res = await getAllQuiz()// Gọi hàm lấy quizz từ services

        if(res.EC === 0){//lấy dữ liệu thành công
            setListQuizz(res.DT);// set dữ liệu cho state để hiển thị
        }
    }
    useEffect(() => {
        fetchListQuizz();
    },[])


    //Cập nhật bắt sự kiện nút update. 
    const handleClickBtnUpdateQuizz = (quizz) => {
        setShowModalUpdateQuizz(true);
        setDataQuizz(quizz);
    };
    //Cập nhật bắt sự kiện nút delete, tương tự view
    const handleClickBtnDeleteQuizz = (quizz) =>{
        setShowModalDeleteQuizz(true);
        setDataQuizz(quizz);//Set data user lấy được khi click cho state
    }

    const handelChangeFile = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setImage(event.target.files[0]); // Gán giá trị url hiện tại cho Image
        }
    }

    const handleSubmitQUiz = async() => {
        //Validate
        if(!name || !description){
            toast.error("Please fill all fields")
            return
        }

        let res = await postCreateQuiz(description, name, type?.value, image)
        console.log("Respone", res)
        if(res.EC === 0){
            toast.success(res.EM)
            setName("")
            setDescription("")
            setImage(null)
            fetchListQuizz()
        }else{
            toast.error(res.EM)
        }
    }
    return(
        <div className="quiz-container">
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
                                    <legend className="float-none w-auto px-3">Add New Quizz</legend>
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
                                            defaultValue={type}
                                            onChange={setType}
                                            options={options}
                                            placeholder={"Quizz Type"}
                                        />
                                    </div>
                                    <div className='more-actions form-group'>
                                        <label for="floatingInput" className='mb-1'>Upload Image</label>
                                        <input 
                                            onChange={(event) => handelChangeFile(event)}                    
                                            type='file' 
                                            className='form-control'
                                        />
                                    
                                    </div>
                                    <div className='mt-3'>
                                        <button onClick={() => handleSubmitQUiz()} className='btn btn-success'>Save</button>
                                    </div>
                                </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz 
                                listQuiz={listQuizz} 
                                setListQuiz={setListQuizz}
                                handleClickBtnUpdateQuizz={handleClickBtnUpdateQuizz}
                                handleClickBtnDeleteQuizz={handleClickBtnDeleteQuizz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <div className="title">
                            Update Q/A Quizz
                        </div>
                        <hr></hr>
                    </Accordion.Header>
                    <Accordion.Body>
                        <QuizzQA/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <div className="title">
                            Assign to Users
                        </div>
                        <hr></hr>
                    </Accordion.Header>
                    <Accordion.Body>
                        <AssignQuizz/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>   
            <ModalUpdateQuizz
                show={showModalUpdateQuizz}
                setShow={setShowModalUpdateQuizz}
                fetchListQuizz={fetchListQuizz}
                handelChangeFile={handelChangeFile}
                dataQuizz={dataQuizz}//truyền data quizz lấy được ở dòng 34 để hiển thị qua trang update
            />
            <ModalDeleteQuizz
                show={showModalDeleteQuizz}
                setShow={setShowModalDeleteQuizz}
                fetchListQuizz={fetchListQuizz}
                dataQuizz={dataQuizz}//truyền data user lấy được ở dòng 34 để hiển thị qua trang Delete        
            />
        </div>
    )
}
export default ManageQuiz;