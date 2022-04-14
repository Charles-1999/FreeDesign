/**
 * LibImage组件配置
 */

// 默认样式
export const defaultStyle = {
  width: 100,
  height: 100
};

// 默认参数

// export const propsHandler = (props) => {
//   return {
//     url: props[0].url || ''
//   };
// };

export const defaultProps = {
  qrcodeText: 'www.baidu.com'
};

export const attrFormConfig = {
  qrcodeText: {
    label: 'QRcodeText',
    type: 'input'
  }
};

export default {
  defaultStyle,
  defaultProps
};
