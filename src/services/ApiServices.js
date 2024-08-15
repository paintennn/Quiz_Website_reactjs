import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, password, userName, role, image) =>{
    //Lấy data từ các state
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userimage', image);
    return axios.post('api/v1/participant', data); // Đẩy dữ liệu lên bằng axios
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
    return axios.put('api/v1/participant', data); // cập nhật lại dữ liệu bằng axios
}

const deleteUserService = (userId) =>{
    return axios.delete('api/v1/participant',{data: {id: userId}}); // xóa dữ liệu user bằng axios
}

const getUserPaginateService = (page, limit) =>{
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`); // lấy dữ liệu user theo phân trang bằng axios
}


//Login
const postLogin = (email, password) => {
    return axios.post('api/v1/login', {email: email, password: password, delay: 3000}); // lấy dữ liệu đăng nhập để gửi lên backend bằng axios
}
//Register
const postRegister = (email, password, username) => {
    return axios.post('api/v1/register', {email: email, password: password, username: username}); // lấy dữ liệu đăng ky để gửi lên backend bằng axios
}


const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (quizId) =>{
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}
//Gửi kết quả câu trả lời
const postSubmitQuiz = (data) => {
    return axios.post('api/v1/quiz-submit', {...data});
}

const postCreateQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
}

const getAllQuiz = () =>{
    return axios.get('api/v1/quiz/all');
}

const putUpdateQuizz = (id, description, name, difficulty, image) =>{
    //Lấy data từ các state
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data); // cập nhật lại dữ liệu bằng axios
}

const deleteQuizzService = (quizzId) =>{
    return axios.delete(`api/v1/quiz/${quizzId}`); // xóa dữ liệu user bằng axios
}

const postCreateNewQuestionForQuizz = (quizzId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizzId);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    const data = new FormData();
    data.append('description', description);
    data.append('correct_answer', correct_answer);
    data.append('question_id', question_id);
    return axios.post('api/v1/answer', data);
}

const postAssignQuizz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa',{...data})
}

const logOut = (email, refresh_token) => {
    return axios.post('api/v1/logout',{
        email, refresh_token
    })
}

const getOverview = () => {
    return axios.get('api/v1/overview');
}

const postChangePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password',{
        current_password, new_password
    });
}
export {
    postCreateNewUser, getAllUsersService, putUpdateUser, deleteUserService, getUserPaginateService, 
    postLogin, postRegister,
    getQuizByUser, getDataQuiz,
    postSubmitQuiz, postCreateQuiz,
    getAllQuiz, putUpdateQuizz, deleteQuizzService,
    postCreateNewQuestionForQuizz, postCreateNewAnswerForQuestion, 
    postAssignQuizz, getQuizWithQA,
    postUpsertQA,
    logOut,
    getOverview,
    postChangePassword
}