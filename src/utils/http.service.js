import axios from 'axios';
import config from '@config';
import { showMessage } from './message.service';

// axios 实例
const instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  },
  baseURL: config.baseURL,
  timeout: 50000,
  withCredentials: true
});

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
    case 5006:
    case 5007:
      if (!noEmit) showMessage(msg);
      break;
  }
};

// 请求拦截器
instance.interceptors.request.use(
  (request) => {
    const { selfHttpConfig = {} } = request;
    const { external = false } = selfHttpConfig;

    // 如果不是外部请求，url添加/api前缀
    if (!external) {
      request.url = '/api' + request.url;
    }

    return request;
  }
);

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
