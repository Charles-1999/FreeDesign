
/**
 * LibIframe组件配置
 */

// 默认样式
export const defaultStyle = {
  width: 340,
  height: 450,
  padding: 10
};

// 默认参数
export const defaultProps = {
  url: 'https://main.m.taobao.com/'
};

export const attrFormConfig = {
  url: {
    label: '页面地址',
    type: 'input'
  }
};

export default {
  defaultStyle,
  defaultProps
};
