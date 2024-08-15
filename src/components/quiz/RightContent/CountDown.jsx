import { useEffect, useState } from "react"

const CountDown = (props) => {
    const [duration, setDuration] = useState(10)

    //Cấu hình thời gian 00:00:00
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10); // don't forget the second param
        const hours   = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num/ 60) % 60;
        const seconds = sec_num % 60;
        
        return [hours, minutes, seconds]
            .map(v => v < 10 ?  "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(':');
    }

    
    useEffect(() => {

        if(duration === 0){
            alert("Hết giờ")
            props.onTimeUp()
            return;
        } 
        const timer = setInterval(() => {
            setDuration(duration - 1) 
        }, 1000) 

        //Clean up
        return () => {
            clearInterval(timer)
        }
    },[duration])
    return(
        <div className="countdown-container">
            {toHHMMSS(duration)}
        </div>
    )
}
export default CountDown