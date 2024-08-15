import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuiz, getAllUsersService, postAssignQuizz } from '../../../../services/ApiServices';
import { toast } from 'react-toastify';
const AssignQuizz = () => {

    const [listQuizz, setListQuizz] = useState([])
    const [selectedQuizz, setSelectedQuizz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    //Fetch danh sách các bài quizz 
    const fetchListQuizz = async() =>{
        let res = await getAllQuiz()// Gọi hàm lấy quizz từ services

        if(res && res.EC === 0){//lấy dữ liệu thành công
            let newQuiz = res.DT.map(item => {
                return{
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                }
            })
            setListQuizz(newQuiz);// set dữ liệu cho state để hiển thị
        }
    }

    //Fetch danh sách User 
    const fetchListUser = async() =>{
        let res = await getAllUsersService()// Gọi hàm lấy quizz từ services

        if(res && res.EC === 0){//lấy dữ liệu thành công
            let user = res.DT.map(item => {
                return{
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                }
            })
            setListUser(user);// set dữ liệu cho state để hiển thị
        }
    }
    useEffect(() => {
        fetchListQuizz();
        fetchListUser();
    },[])

    //CLick Assign
    const handleAssign = async () => {
        let res = await postAssignQuizz(selectedQuizz.value, selectedUser.value)
        if(res && res.EC === 0){
            toast.success(res.EM)
        }else{
            toast.error(res.EM)
        }
    }
    return(
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                    <label>Select Quizz</label>
                    <Select
                        defaultValue={selectedQuizz}
                        onChange={setSelectedQuizz}
                        options={listQuizz}
                    />
            </div>
            <div className="col-6 form-group">
                    <label>Select User</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
            </div>
            <div className='mt-3'>
                <button onClick={() => handleAssign()} className="btn btn-warning">Assign Quizz</button>
            </div>
        </div>
    )
}
export default AssignQuizz;