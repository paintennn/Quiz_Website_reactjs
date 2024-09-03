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
import ManageQuiz from "./components/admin/content/Quiz/ManageQuiz";
import Questions from "./components/admin/content/Questions/Questions";
import PrivateRoute from "./routes/PrivateRoute";
const Layout = (props) => {
    return(
        <>
        <Routes>
            <Route exact path='/' element={<App/>}>
                <Route exact index element={<Home/>}/>
                <Route exact  path='/quiz' element={
                    <PrivateRoute>
                        <ListQuiz/>
                    </PrivateRoute>
                }/>       
            </Route>
            <Route exact  path='/quiz/:id' element={<DetailQuiz/>}/>  
            <Route exact  path='/admins' element={
                <PrivateRoute>
                    <Admin/>
                </PrivateRoute>
            }>
                <Route exact  index element={<DashBoard/>}/>
                <Route exact  path='manage-user' element={<ManageUser/>}/>
                <Route exact  path='manage-quizzes' element={<ManageQuiz/>}/>
                <Route exact  path='manage-questions' element={<Questions/>}/>
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