import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './components/admin/Admin';
import Home from './components/home/Home';
import ManageUser from './components/admin/content/ManageUser';
import DashBoard from './components/admin/content/DashBoard';
import Quiz from './components/quiz/Quiz';
import Login from './components/auth/Login';
import App from './views/App';
import Register from "./components/auth/Register";
import ListQuiz from "./components/quiz/ListQuiz";
import DetailQuiz from "./components/quiz/DetailQuiz";
const Layout = (props) => {
    return(
        <>
        <Routes>
            <Route exact path='/' element={<App/>}>
                <Route exact index element={<Home/>}/>
                <Route exact  path='/quiz' element={<ListQuiz/>}/>       
            </Route>
            <Route exact  path='/quiz/:id' element={<DetailQuiz/>}/>  
            <Route exact  path='/admins' element={<Admin/>}>
                <Route exact  index element={<DashBoard/>}/>
                <Route exact  path='manage-user' element={<ManageUser/>}/>
            </Route>

            <Route exact  path='/login' element={<Login/>}/>
            <Route exact  path='/register' element={<Register/>}/>
        </Routes>

        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
        />
        </>
    )
}
export default Layout;