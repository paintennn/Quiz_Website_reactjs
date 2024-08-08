import { useState } from 'react';
import './Login.scss'
import { GrFormPrevious } from "react-icons/gr";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/ApiServices';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();//Gọi dispatch Redux
    const [isLoading, setIsLoading] = useState(false);
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const handleLogin = async() => {
        //validate
        const isValidEmail = validateEmail(email);
        if(!isValidEmail) {
            toast.error("Invalid email address");
            return;
        }
        if(!password){
            toast.error("Password is required");
            return;
        }
        setIsLoading(true);//set loading cho nút login
        // Submit API
        try {
            let data = await postLogin(email, password);
            console.log("data", data);

            // Check result
            if (data && data.EC === 0) {
                //Dispatch actions chứa data khi login thành công
                dispatch(doLogin(data))
                toast.success(data.EM); // Thành công
                setIsLoading(false)
                navigate('/'); // Hoặc trang khác nếu cần
            } else {
                toast.error(data.EM); // Thất bại
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    }
    return(
        <div className="container mt-5">
            <div className='back'>
                <span onClick={() => {navigate('/')}}><GrFormPrevious />Back Home</span>
            </div>
            <div className='mt-5 title'>
               <h1>NgocBaoQuizz</h1>
               <h3>Hello,Who's this?</h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Login</h3>
                        </div>
                        <div className="card-body">
                                <div className="form-group mb-2">
                                    <label for="email">Email address</label>
                                    <input
                                        onChange={(event) => setEmail(event.target.value)}
                                        value={email} 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Enter your email" 
                                        required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="password">Password</label>
                                    <input 
                                        onChange={(event) => setPassword(event.target.value)}
                                        value={password} 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Enter your password" 
                                        required/>
                                </div>
                                <div className='orther mb-2'>
                                    <a href=''>Forgot Password?</a>
                                    <a onClick={() => {navigate('/register')}} href=''>Register</a>
                                </div>
                                <button 
                                    onClick={() => handleLogin()} 
                                    type='submit' 
                                    disabled = {isLoading}
                                    className="btn-submit btn btn-primary btn-block loader"
                                >
                                    {isLoading === true &&
                                    <ImSpinner6 className='loaderIcon'/>} {/*Nếu isLoading là true thì mới loadIcon*/}
                                    <span>Login</span>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;