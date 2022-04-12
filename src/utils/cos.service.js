/**
 * 七牛云封装
 */

import http from '@utils/http.service';
import config from '@config';
import COS from 'cos-js-sdk-v5';

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

// 点击上传按钮上传文件到腾讯云
export const uploadCos = async (file) => {
  const cos = new COS({
    SecretId: 'AKIDCEzUigNnvmMgiTzFF3cvxiDRO4SaR1KO', // 密钥id
    SecretKey: 'oNgjV0ECtJUQ6VdU5OQCguruhETR8j48'// 密钥的key
  });
  // var file = document.getElementById('videoFile').files[0];
  return new Promise((resolve, reject) => {
    return cos.putObject({
      Bucket: 'cjztest-1302847834', // 桶名-APPID  必须
      Region: 'ap-nanjing', // 区域 必须
      Key: `logos/${file.name}`, // 文件名必须
      StorageClass: 'STANDARD',
      Body: file // 上传文件对象
    }, function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};

export default {
  uploadCos,
  getUploadToken
};
