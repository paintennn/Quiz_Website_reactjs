import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, password, userName, role, image) =>{
    //Lấy data từ các state
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userimage', image);
    return axios.post('/api/v1/participant', data); // Đẩy dữ liệu lên bằng axios
}

const getAllUsersService = () =>{
    return axios.get('api/v1/participant/all'); // Lấy toàn bộ dữ liệu user bằng axios
}

const putUpdateUser = (id, userName, role, image) =>{
    //Lấy data từ các state
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userimage', image);
    return axios.put('/api/v1/participant', data); // cập nhật lại dữ liệu bằng axios
}

const deleteUserService = (userId) =>{
    return axios.delete('api/v1/participant',{data: {id: userId}}); // xóa dữ liệu user bằng axios
}

const getUserPaginateService = (page, limit) =>{
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`); // lấy dữ liệu user theo phân trang bằng axios
}


//Login
const postLogin = (email, password) => {
    return axios.post('/api/v1/login', {email: email, password: password, delay: 3000}); // lấy dữ liệu đăng nhập để gửi lên backend bằng axios
}
//Register
const postRegister = (email, password, username) => {
    return axios.post('/api/v1/register', {email: email, password: password, username: username}); // lấy dữ liệu đăng ky để gửi lên backend bằng axios
}


const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (quizId) =>{
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}
export {
    postCreateNewUser, getAllUsersService, putUpdateUser, deleteUserService, getUserPaginateService, 
    postLogin, postRegister,
    getQuizByUser, getDataQuiz
}