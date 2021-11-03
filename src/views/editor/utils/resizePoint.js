/**
 * 缩放点的公共函数
 */

import { formatStyle } from '@utils/style';

/**
 * @param {string} point 缩放点的方位
 * @return {Object} 缩放点的样式
 */
export const getPointStyle = (point) => {
  const { focusList, eleSchema, data } = this;
  const elements = eleSchema.filter(_ => focusList.includes(_.uuid));

  // TODO-1 这部分计算提取到computed，避免重复计算
  let maxWidth = 0;
  let maxHeight = 0;
  let minLeft = data.width;
  let minTop = data.height;

  elements.forEach(element => {
    const { compStyle, eleStyle } = element;
    const totalWidth = compStyle.width + eleStyle.left;
    const totalHeight = compStyle.height + eleStyle.top;

    if (totalWidth >= maxWidth) maxWidth = totalWidth;
    if (totalHeight >= maxHeight) maxHeight = totalHeight;
    if (eleStyle.left <= minLeft) minLeft = eleStyle.left;
    if (eleStyle.top <= minTop) minTop = eleStyle.top;
  });

  const leftPoint = /w/.test(point);
  const topPoint = /n/.test(point);

  const style = {
    left: leftPoint ? minLeft - 5 : maxWidth - 5,
    top: topPoint ? minTop - 5 : maxHeight - 5,
    marginLeft: ['n', 's'].includes(point) ? '-50%' : 0,
    marginTop: ['w', 'e'].includes(point)
      ? -(maxHeight / 2)
      : 0,
    cursor: getCursor(point)
  };

  return formatStyle(style);
};

/**
 * @param {string} point 缩放点的方位
 * @return {string} cursor的值
 */
export const getCursor = (point) => {
  let value = '';

  switch (point) {
    case 'nw':
    case 'se':
      value = 'nwse';
      break;

    case 'ne':
    case 'sw':
      value = 'nesw';
      break;

    case 'n':
    case 's':
      value = 'ns';
      break;

    case 'w':
    case 'e':
      value = 'ew';
      break;
  }

  return `${value}-resize`;
};

export default {
  getPointStyle,
  getCursor
};
