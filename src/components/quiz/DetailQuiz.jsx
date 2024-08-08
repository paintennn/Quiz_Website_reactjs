import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {getDataQuiz} from "../../services/ApiServices"
import _ from 'lodash';
import './DetailQuiz.scss'
import Questions from "./Questions";

const DetailQuiz = (props) => {
    const param = useParams(); //Dùng param để lấy id của từng bài học 
    const quizId = param.id;
    const location = useLocation(); //Dùng location để lấy query param
    console.log(location)
    const [dataQuiz, setDataQuiz] = useState([]);//Dùng để setdata khi raw thành công
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchQuestions();
    },[quizId]) //Lấy dữ liệu sau mỗi lần gọi Id quiz khác nhau

    const fetchQuestions = async() => {
        let res = await getDataQuiz(quizId);
        console.log(">>Check question" + res);
        if(res && res.EC === 0){
            let raw = res.DT;
            let questionDescription, image = null;
            //Lodash Groupby
            let data =  _.chain(raw)
                .groupBy("id")//Gộp tất cả data theo chung id
                //key là group ID, value là mảng object dữ liệu
                .map((value,key) => {
                    let answers = [];
                    value.forEach((item, index) => {
                        console.log("value", value, "item", item)
                        if(index === 0){
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                    });
                    return {questionId: key, answers, questionDescription, image}
                })
                .value()
                
            setDataQuiz(data); //Set data user
            console.log(data)
        }
    }


    const handelPrev = () => {
        if(index > 0){
            setIndex(index - 1)
        }
    }
    const handelNext = () => {
        if(dataQuiz && dataQuiz.length > index+1){
            setIndex(index + 1)
        }      
    }
    const handelFinish = () => {
        
    }

    const handleCheckBox =(answerId , questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); //cloneDeep để clone tất cả object 
        let q = dataQuizClone.find(item => item.questionId === questionId)
        if(q && q.answers){
            console.log('q: ', q)
            let b = q.answers.map(a => {
                if(a.id === answerId){
                    a.isSelected = !a.isSelected;//Kiểm tra nếu id answer lựa chọn bằng với id a của câu hỏi thì set bằng true
                }
                return a;
            })
            q.answers = b; //Set biến selected bằng true thì cần gán question cho b để cập nhật lại dataQuizClone
        }

        let index = dataQuizClone.findIndex(item => item.questionId === questionId)
        if(index > -1){
            dataQuizClone[index] = q;
            setDataQuiz(dataQuizClone); //Set data user
        }
    }
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="q-title">
                    <h1>Quiz {quizId} : {location?.state?.quizTitle}</h1>
                </div>
                <hr/>
                <div className="q-body">
                    <img></img>
                </div>
                <div className="q-content">
                    {/*Truyền prop là data cho thg question với, nếu dataQuiz có tồn tại thì truyền dataQuiz với index đó còn ko thì truyền mảng rỗng */}
                    <Questions 
                        data={dataQuiz && dataQuiz.length > 0 ?dataQuiz[index] : []}
                        index={index}
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="q-footer">
                    <button onClick={() => handelPrev()} className="btn btn-secondary">Prev</button>
                    <button onClick={() => handelNext()} className="btn btn-primary">Next</button>
                    <button onClick={() => handelFinish()} className="btn btn-success">Finish</button>
                </div>
            </div>
            <div className="right-content">
                Count down
            </div>

        </div>
    )
}
export default DetailQuiz;