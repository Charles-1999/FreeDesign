/**
 * LibText组件配置
 */

// 默认样式
export const defaultStyle = {
  width: 200,
  height: 100
};

// 默认参数
export const defaultProps = {
  text: '双击编辑文本'
};

export const attrFormConfig = {
  text: {
    label: '文本',
    type: 'el-input',
    config: {
      type: 'textarea'
    }
  }
};

export default {
  defaultStyle,
  defaultProps
};
