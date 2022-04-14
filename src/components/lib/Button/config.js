/**
 * LibButton组件配置
 */

// 默认样式
export const defaultStyle = {
  width: 100,
  height: 40,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#034FD8',
  backgroundColor: '#034FD8',
  color: '#fff'
};

// 默认参数
export const defaultProps = {
  text: '按钮'
};

export const attrFormConfig = {
  text: {
    label: '文本',
    type: 'input'
  }
};

export default {
  defaultStyle,
  defaultProps
};
