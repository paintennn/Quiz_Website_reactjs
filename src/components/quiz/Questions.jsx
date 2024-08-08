import _ from 'lodash';
import './DetailQuiz.scss'
import { useState } from 'react';
const Questions = (props) => {
    const {data, index} = props;
    if(_.isEmpty(data)){
        return (<></>)
    }
    const handelSubmit = (event, aId, qId) => {
        console.log("check", event.target.checked)
        console.log("data prop",aId, qId)
        props.handleCheckBox(aId, qId)
    }
    
    return (
        <>
            {data.image &&
                <div className='q-image'>
                    <img src={`data:image/jpg;base64,${data.image}`}></img>
                </div>
            }
            <div className="question mb-2">Question {index + 1}: {data.questionDescription} ?</div>
            <div className="answer">
                {data.answers && data.answers.length && data.answers.map((a,index) => {
                    return(
                        <div className="btn-group" key={`anser-${index}`} role="group" >
                            <input 
                                onChange={(event) => handelSubmit(event, a.id, data.questionId)} //Ltruyền event và id của câu trả lời - id của câu hỏi
                                id={`${index}`} 
                                type="checkbox" 
                                checked = {a.isSelected}
                                className="btn-check" 
                                autocomplete="off"
                            />
                            <label className="btn btn-outline-primary" for={`${index}`}>{a.description}</label>
                        </div>
                    )
                })}
            </div>        
        </>
    )
}

export default Questions;