import { store } from "../redux/store";
//mục đích: để giảm lược hóa bước xử lý data ở client

import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:8081/',
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  //Mỗi 1 lần gọi request thì sẽ thêm cái token vào
  const access_token = store?.getState()?.user?.account?.access_token;
  config.headers["Authorization"] = "Bearer " + access_token;

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
  });
export default instance;