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

export {postCreateNewUser, getAllUsersService}