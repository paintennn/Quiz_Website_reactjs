import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
    account:{
        access_token:'',
        refresh_token:'',
        username:'',
        image:'',
        role:'',
        email:''
    },
    isAuthenticated:false
}

const userReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state, account:{
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email
                },
                isAuthenticated: true // Kiểm tra nếu đăng nhập thành công thì đổi thành true
            };
        case LOGOUT_SUCCESS:
            return{
                account:{
                    access_token:'',
                    refresh_token:'',
                    username:'',
                    image:'',
                    role:'',
                    email:''
                },
                isAuthenticated:false
            }
        default:
            return state;
    }
}
export default userReducer;