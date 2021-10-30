/**
 * lib组件的公共基础样式
 */
export const commonStyle = {
  // 尺寸
  width: 100,
  height: 100,
  rotate: 0,
  boxSizing: 'border-box',

  // 边距
  padding: '0px 0px 0px 0px',

  // 边框
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: '#000',
  borderRadius: 0,

  // 背景
  backgroundColor: 'transparent',
  backgroundClip: 'content-box',

  // 字体
  color: '#3e3e3e',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.4,
  letterSpacing: 0
};

/**
 * 格式化样式对象
 * @param {object} style style
 * @return {object} 格式化后的样式对象
 */
export const formatStyle = (style) => {
  const unitKeys = [
    'width', 'height', 'top', 'left',
    'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
    'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'borderWidth', 'borderRadius',
    'fontSize', 'letterSpacing'
  ];

  return Object
    .keys(style)
    .reduce((obj, key) => {
      const val = style[key];

      // 如果是数字类型的值，默认添加'px'后缀
      if (unitKeys.includes(key) && typeof val === 'number') {
        obj[key] = `${val}px`;
      } else if (key === 'rotate') {
        obj.transform = `rotate(${val}deg)`;
      } else {
        obj[key] = val;
      }

      return obj;
    }, {});
};

export default {
  commonStyle,
  formatStyle
};
