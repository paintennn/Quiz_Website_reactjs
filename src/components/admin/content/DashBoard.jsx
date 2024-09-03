import { PieChart } from "@mui/x-charts";
import './DashBoard.scss';
import { useEffect, useState } from "react";
import { getOverview } from "../../../services/ApiServices";
const DashBoard = (props) => {

    const [dataOver, setDataOver] = useState([])
    const [Qz, setQz] = useState(0);
    const [Qs, setQs] = useState(0);
    const [As, setAs] = useState(0);

    useEffect(() => {
        fetchDataOverview();
    },[])

    const fetchDataOverview = async() => {
        let res = await getOverview();
        if(res && res.EC === 0){
            setDataOver(res.DT)
            //process chart data
            setQz(res?.DT?.others?.countQuiz ?? 0);
            setQs(res?.DT?.others?.countQuestions ?? 0);
            setAs(res?.DT?.others?.countAnswers ?? 0);
        }
    }

    return(
        <div className="dashboard-container">
            <h1 className="Title">DashBoard</h1>
            <div className="Content">
                <div className="Content-left">
                    <div className="Content-left-child">
                        <h4>Total Users</h4>
                        <span className="text-2">
                            {dataOver && dataOver.users &&
                                dataOver.users.total ?
                                <>{dataOver.users.total}</>:<>0</>
                            }
                        </span>
                    </div>
                    <div className="Content-left-child">
                        <h4>Total Quizzes</h4>
                        <span className="text-2">
                            {dataOver && dataOver.others &&
                                dataOver.others.countQuiz ?
                                <>{dataOver.others.countQuiz}</>:<>0</>
                            }
                        </span>
                    </div>
                    <div className="Content-left-child">
                        <h4>Total Questions</h4>
                        <span className="text-2">
                            {dataOver && dataOver.others &&
                                dataOver.others.countQuestions ?
                                <>{dataOver.others.countQuestions}</>:<>0</>
                            }
                        </span>
                    </div>
                    <div className="Content-left-child">
                        <h4>Total Answers</h4>
                        <span className="text-2">
                            {dataOver && dataOver.others &&
                                dataOver.others.countAnswers ?
                                <>{dataOver.others.countAnswers}</>:<>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className="Content-right">
                    <PieChart
                        series={
                            [
                                {
                                data: [
                                    { id: 0, value: Qz, label: 'Quizzes' },
                                    { id: 1, value: As, label: 'Answers' },
                                    { id: 2, value: Qs, label: 'Questions' },
                                ],
                                },
                            ]
                        }
                        width={450}
                        height={250}
                    />
                </div>
            </div>
        </div>
    )
}
export default DashBoard;