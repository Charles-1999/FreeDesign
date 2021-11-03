import axios from 'axios';
import config from '@config';
import { showMessage } from './message.service';

// axios 实例
const instance = axios.create();

/* 1. 设置实例默认参数 */

// 默认URL前缀
instance.defaults.baseURL = config.baseURL;
// 携带cookie
instance.defaults.withCredentials = true;

/* 2. 设置拦截器 */

/**
 * 处理请求失败
 * @param {number} status   状态码
 * @param {number} errcode  错误码
 * @param {string} msg      提示信息
 * @param {boolean} noEmit  是否即使异常也不要弹窗提示
 */
const handleRequestError = (status, errcode, msg, noEmit) => {
  switch (errcode) {
    case 5007:
      // 尚未登录
      if (!noEmit) showMessage('尚未登录');
      break;
  }
};

// 请求拦截器
// instance.interceptors.request.use()

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (response) => {
    return Promise.resolve(response.data);
  },

  // 请求失败
  (error) => {
    const { status, data, config } = error.response;
    const { errcode, message } = data;
    // 请求的独立配置
    const { selfHttpConfig = {} } = config;

    handleRequestError(status, errcode, message, selfHttpConfig.noEmit);

    return Promise.reject(error);
  }
);

export default instance;
