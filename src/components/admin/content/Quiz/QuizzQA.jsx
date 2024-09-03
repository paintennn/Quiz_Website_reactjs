import'./QuizzQA.scss';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { CiCirclePlus } from "react-icons/ci";
import { IoTrash } from "react-icons/io5";
import { RiImageAddFill, RiAddBoxFill } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { getAllQuiz, getQuizWithQA, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuizz } from '../../../../services/ApiServices';

const QuizzQA = (props) => {

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description:'',
                imageFile:'',
                imageName:'',
                answers:[
                    {
                        id: uuidv4(),
                        description:'',
                        isCorrect:false
                    }
                ]
            }
        ]
    )

    const handleAddRemoveQuestion = (type, id) => {
        //ADD
        if(type === 'ADD'){
            const newQuestion = {
                id: uuidv4(),
                description:'',
                imageFile:'',
                imageName:'',
                answers:[
                    {
                        id: uuidv4(),
                        description:'',
                        isCorrect:false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if(type === 'REMOVE'){
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(q => q.id !== id);
            setQuestions(questionClone);
        }
        
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions)
        //ADD
        if(type === 'ADD'){
            const newAnswer = {
                id: uuidv4(),
                description:'',
                isCorrect:false                  
            }
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)
        }
        if(type === 'REMOVE'){
            let index = questionClone.findIndex(item => item.id === questionId)
            //Cập nhật lại câu hỏi với câu trả lời vừa cập nhật vằng filter
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone);
        }
        
    }

    const handleOnChange = (type, questionId, value) => {
        if(type === 'QUESTION'){
            let questionClone = _.cloneDeep(questions)
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].description = value
            setQuestions(questionClone);
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if(index > -1 && event.target && event.target.files && event.target.files[0]){
            questionClone[index].imageFile = event.target.files[0]
            questionClone[index].imageName = event.target.files[0].name
            setQuestions(questionClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if(index > -1){
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                if(answer.id === answerId){
                    if(type === 'CHECKBOX'){
                        answer.isCorrect = value;
                    }
                    if(type === 'INPUT'){
                        answer.description = value
                    } 
                }
                return answer;
            })
            setQuestions(questionClone);
        }
    }

    const handleSubmitQuestionForQuizz = async() => {
        //Submit Questions
        await Promise.all( questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuizz(
                selectedQuizz.value, question.description, question.imageFile
            ) 
            //Submit Answers
            await Promise.all(question.answers.map(async(answer) => {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
            }))
        }))
        
    }

    const [listQuizz, setListQuizz] = useState([])
    const [selectedQuizz, setSelectedQuizz] = useState({})
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
    useEffect(() => {
        fetchListQuizz();
    },[])

    const fetchQuizzWithQA = async() => {
        let rs = await getQuizWithQA(selectedQuizz.value)
        if(rs && rs.EC === 0){
            //Convert base64 to file object
            setQuestions(rs.DT.qa);
            console.log("cc",rs.DT.qa)
        }
    }
    useEffect(() =>{
        if(selectedQuizz && selectedQuizz.value){
            fetchQuizzWithQA();
        }
    },[selectedQuizz])
    return(
        <>
            <div className="questions-container">
                <div className="add-new-question mb-5">
                    <label>Select Quizz</label>
                    <Select
                        defaultValue={selectedQuizz}
                        onChange={setSelectedQuizz}
                        options={listQuizz}
                    />
                </div>
                <h3>Add Question</h3>
                <div className='mt-3'>
                    {questions && questions.length > 0 
                        && questions.map((question, index) => {
                            return(
                                <div key={question.id} className='q-main mb-5'>
                                <Row className="mb-3 align-items-center">
                                    <Col md={6} className="mb-3">
                                        <div>
                                            <input 
                                                value={question.description} 
                                                type="text" 
                                                style={{ height: '100px' , fontSize: '18px'}}
                                                className="form-control" 
                                                placeholder={`Question ${index+1} description`}
                                                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div>
                                            <h3><RiImageAddFill /> Upload Image</h3>
                                            <input 
                                                onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                                type="file" 
                                                className="form-control" 
                                            />    
                                        </div>
                                    </Col>
                                    <Col>
                                        <button onClick={() => handleAddRemoveQuestion('ADD','')}><RiAddBoxFill /></button>
                                        {questions.length > 1 && //Mặc định là phải luôn có 1 questions, nếu có nhiều hơn 1 questions thì mới có thể xóa
                                            <button onClick={() => handleAddRemoveQuestion('REMOVE',question.id)}><MdOutlineDeleteForever /></button>
                                        }
                                       
                                    </Col>
                                </Row>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer,index) => {
                                        return(
                                            <div key={answer.id}>
                                                <Row className="Answers">
                                                    <Col className="d-flex align-items-center mb-3">
                                                        <Form.Check
                                                            type="checkbox"
                                                            className="me-2"
                                                            aria-label="Checkbox for answering question"
                                                            checked={answer.isCorrect}
                                                            onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                        />
                                                        <Form.Control
                                                            onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                            type="text"
                                                            value={answer.description}
                                                            placeholder={`Answer ${index + 1}`}
                                                            className="me-2" // Adds margin to the right
                                                        />
                                                
                                                        <Button onClick={() => handleAddRemoveAnswer('ADD', question.id)} className='btn-success btn'>
                                                            <CiCirclePlus/>
                                                        </Button>
                                                        {question.answers.length > 1 && //Mặc định là phải luôn có 1 answer, nếu có nhiều hơn 1 answer thì mới có thể xóa
                                                            <Button onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)} className='btn-danger'>
                                                                <IoTrash/>
                                                            </Button>
                                                        }
                                                        
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                        
                            </div>
                                
                            )
                        })
                    }
                    {questions && questions.length > 0 &&
                        <button onClick={() => handleSubmitQuestionForQuizz()} className='btn btn-success'>
                            Save Question
                        </button>
                    }
                    
                </div>
            </div>
        </>
    )
}
export default QuizzQA;