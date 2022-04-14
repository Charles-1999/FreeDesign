export const baseComp = {
  text: {
    label: '文本',
    icon: 'icon-wenzi',
    size: 20
  },
  rect: {
    label: '矩形',
    icon: 'icon-juxing1',
    size: 24
  },
  line: {
    label: '分割线',
    icon: 'icon-fengexian2',
    size: 26
  }
};

export const formComp = {
  button: {
    label: '按钮',
    icon: 'icon-biaodanzujian-anniu',
    size: 26
  },
  input: {
    label: '输入框',
    icon: 'icon-danhangshurukuang',
    size: 26
  }
};

export const mediaComp = {
  image: {
    label: '图片',
    icon: 'icon-tupian1',
    size: 28
  },
  video: {
    label: '视频',
    icon: 'icon-shipin',
    size: 26
  },
  audio: {
    label: '音频',
    icon: 'icon-audio-full',
    size: 24
  },
  iframe: {
    label: '页面容器',
    icon: 'icon-yemian',
    size: 24
  }
};

export const compList = [
  {
    label: '基础组件',
    children: baseComp
  },
  {
    label: '媒体组件',
    children: mediaComp
  },
  {
    label: '表单组件',
    children: formComp
  }
];

export default {
  baseComp,
  formComp,
  compList
};
