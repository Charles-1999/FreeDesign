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
      } else {
        obj[key] = val;
      }

      return obj;
    }, {});
};

export default {
  formatStyle
};
