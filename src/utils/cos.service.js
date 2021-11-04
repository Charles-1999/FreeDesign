/**
 * 七牛云封装
 */

import http from '@utils/http.service';

/**
 * 获取token 并 存在storage
 * @return token
 */
export const getUploadToken = async () => {
  const { token } = await http.get('/api/resources/qiniu/upload_token');

  return token;
};

export default {
  getUploadToken
};
