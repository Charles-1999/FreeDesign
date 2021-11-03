/**
 * 基于ElementUI封装的消息提示
 */

import { Message } from 'element-ui';

export const showMessage = (msg, type) => {
  Message({
    message: msg || '发生异常',
    type: type || 'error'
  });
};

export default {
  showMessage
};
