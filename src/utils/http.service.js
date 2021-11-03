import axios from 'axios';

// axios 实例
const instance = axios.create();

/* 1. 设置实例默认参数 */

// 默认URL前缀
// instance.defaults.baseURL = 'http://120.24.151.34:8000/api';
// 携带cookie
instance.defaults.withCredentials = true;

/* 2. 设置拦截器 */

// 请求拦截器
// instance.interceptors.request.use()

// 响应拦截器
// instance.interceptors.response.use(
//   // 请求成功
//   (response) => {

//   }
// )

export default instance;
