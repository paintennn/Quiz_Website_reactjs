import '../DetailQuiz.scss'
import CountDown from './CountDown'
import { useRef } from 'react'
const RightContent = (props) => {
    const refDiv = useRef([])

    const {dataQuiz} = props
    console.log("dataQuiz", dataQuiz)

    const onTimeUp = () => {
        props.handelFinish()
    }

    const getClassQuestion = (question) => {
        if(question && question.answers.length > 0) {
            let isAnswer = question.answers.find(a => a.isSelected === true) //Nếu chưa có câu trả lời nào được chọn
            if(isAnswer){
                return "question selected"
            }
        }
        return "question"
    }

    const handleClickQuestion = (question, index) => {
        props.setIndex(index)
        if(refDiv.current){
            refDiv.current.forEach(item => {
                if(item && item.className === "question clicked"){
                    item.className = "question"
                }
            })
        }
        if(question && question.answers.length > 0) {
            let isAnswer = question.answers.find(a => a.isSelected === true) //Nếu chưa có câu trả lời nào được chọn
            if(isAnswer){
                return
            }
        }
        refDiv.current[index].className = "question clicked"
    }
    return(
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp}/>
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item,index) => {
                        return(
                            <div 
                                key={index} 
                                className={getClassQuestion(item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref = {element => refDiv.current[index] = element}
                            >
                                {index+1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default RightContent;