/**
 * 页面基础样式
 */

import COS from 'cos-js-sdk-v5';
export const pageCommonStyle = {
  // 背景
  backgroundColor: undefined,
  backgroundImage: []
};

/**
 * lib组件的公共基础样式
 */
export const compCommonStyle = {
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
  backgroundColor: undefined,
  backgroundClip: 'content-box',

  // 字体
  color: '#3e3e3e',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.4,
  letterSpacing: 0
};

/**
 * element元素的公共基础样式 eleStyle
 */
export const eleCommonStyle = {
  // 层级
  zIndex: 100
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
      } else if (key === 'backgroundImage') {
        // 处理背景图片
        obj[key] = `url(${(val[0] || {}).url})`;
      } else {
        obj[key] = val;
      }

      return obj;
    }, {});
};
export const animateCSS = (el, animation, prefix = 'animate__') => {
  return new Promise((resolve, reject) => {
    const { name, duration, delay } = animation;
    // 动画名称
    console.log(name);
    el.classList.add('animated', name);
    el.style.setProperty('animation-duration', `${duration}s`);
    el.style.setProperty('animation-delay', `${delay}s`);

    // 当动画结束，清掉动画的类
    function handleAnimationEnd(event) {
      event.stopPropagation();
      el.classList.remove('animated', name);
      resolve('Animation ended');
    }

    el.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
};
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
  compCommonStyle,
  eleCommonStyle,
  formatStyle,
  animateCSS,
  uploadCos
};
