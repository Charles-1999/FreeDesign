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
const ErrorMsg = {
  code: -1,
  msg: 'err',
  data: {}
};

const Axios = {
  get: async ({ url = '', config = {}, callback }) => {
    try {
      const res = await instance.get(url, config);

      if (res.status === 200) {
        const result = res.data;
        callback && callback(result);
        return result;
      }

      return null;
    } catch (error) {
      console.log('get catch error: ', error);
    }
  },
  post: async ({ url = '', data, callback }, headers = {}) => {
    if (typeof data === 'string') {
      data = JSON.stringify(data);
    }

    try {
      const res = (await instance.post(url, data, headers)) || {};
      console.log(res, 'success-before');
      if (res && res.status === 200) {
        console.log('success');
        const result = res.data;
        callback && callback(result);
        return result;
      }

      return ErrorMsg;
    } catch (error) {
      const csrfRes = await Axios.get({ url: '/getBaseInfo' });

      if (csrfRes.code === 0 && csrfRes.data.csrfToken) {
        Vue.prototype.$cookies.set('csrfToken', csrfRes.data.csrfToken);
        return await Axios.post({ url, data, callback });
      }
    }

    if (+error.status === 401 && error.data && +error.data.code === 401) {
      location.replace(`https://paas.oa.com/_logout/?url=${encodeURIComponent(`https://${location.host}/pages`)}`);
      return error.data;
    }

    return ErrorMsg;
  }
};

const axiosWrap = instance;

axiosWrap.get = (url, param) => instance.get(url, { param });
axiosWrap.post = (...args) => instance.post(...args);

export default instance;
