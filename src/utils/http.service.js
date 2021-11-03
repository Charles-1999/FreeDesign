import axios from 'axios';
import config from '@config';

// axios 实例
const instance = axios.create();

/* 1. 设置实例默认参数 */

// 默认URL前缀
instance.defaults.baseURL = config.baseURL;
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
