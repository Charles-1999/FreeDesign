
/**
 * LibAudio组件配置
 */

// 默认样式
export const defaultStyle = {
  width: 300,
  height: 100,
  padding: 10
};

// 默认参数
export const defaultProps = {
  url: 'https://cjztest-1302847834.cos.ap-nanjing.myqcloud.com/y766.mp3',
  autoplay: false,
  controls: true,
  loop: true
};

export const attrFormConfig = {
  url: {
    label: '音频链接',
    type: 'input'
  },
  autoplay: {
    label: '自动播放',
    type: 'radio',
    options: [{
      label: '是',
      value: true
    }, {
      label: '否',
      value: false
    }]
  },
  controls: {
    label: '显示控件',
    type: 'radio',
    options: [{
      label: '是',
      value: true
    }, {
      label: '否',
      value: false
    }]
  },
  loop: {
    label: '循环播放',
    type: 'radio',
    options: [{
      label: '是',
      value: true
    }, {
      label: '否',
      value: false
    }]
  }
};

export default {
  defaultStyle,
  defaultProps
};
