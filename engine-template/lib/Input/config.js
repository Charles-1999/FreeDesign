
/**
 * LibInput组件配置
 */

// 默认样式
export const defaultStyle = {
  width: 200,
  height: 40,
  borderWidth: 1,
  borderRadius: 6,
  borderColor: '#c0c4cc',
  paddingLeft: 10,
  backgroundColor: '#fff'
};

// 默认参数
export const defaultProps = {
  placeholder: '请输入'
};

export const attrFormConfig = {
  placeholder: {
    label: '占位文本',
    type: 'input'
  }
};

export default {
  defaultStyle,
  defaultProps
};
