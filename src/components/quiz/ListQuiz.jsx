import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/ApiServices";
import './ListQuiz.scss'
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
    const navigate = useNavigate();
    const[arrQuiz, setArrQuiz] = useState([]) 
    useEffect(() => {
        getQuizData();
    },[])

    const getQuizData = async() => {
       const res = await getQuizByUser();
       console.log("DT",res.DT);
       if(res && res.EC === 0){
        setArrQuiz(res.DT)  // set data user
       }
    }
    return(
        <div className="ListQuizContainer container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return(
                        <div key={`${index}-quiz`} className="card" style={{width: "18rem"}}>
                            <img src={`data:image/jpg;base64,${item.image}`} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button onClick={
                                    () => navigate(`/quiz/${item.id}`, 
                                        {state:{quizTitle: item.description}}) //List up state để truyền thông tin title hiện tại xuống cho trang Detail
                                    } className="btn btn-primary">Start now</button>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuiz && arrQuiz.length === 0 &&
                <div>
                    <h1>Your don't have any quiz now</h1>
                </div>
            }
        </div>
    )
}
export default ListQuiz;