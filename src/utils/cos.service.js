/**
 * 七牛云封装
 */

import http from '@utils/http.service';
import config from '@config';

/**
 * 获取token 并 存在storage
 * @return token
 */
export const getUploadToken = async () => {
  const { token } = await http.get('/resources/qiniu/upload_token');

  return token;
};

/**
 * 上传七牛
 */
export const upload = (formData) => {
  return http.post(config.cos.uploadUrl, formData, {
    withCredentials: false,
    selfHttpConfig: {
      external: true
    }
  });
};

export default {
  getUploadToken
};
