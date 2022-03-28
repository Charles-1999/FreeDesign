export const baseComp = {
  text: {
    label: '文本',
    icon: 'icon-wenben',
    size: 18
  },
  rect: {
    label: '矩形',
    icon: 'icon-juxing',
    size: 18
  },
  image: {
    label: '图片',
    icon: 'icon-tupian',
    size: 18
  },
  line: {
    label: '分割线',
    icon: 'icon-tupian',
    size: 18
  }
};

export const compList = [
  {
    label: '基础组件',
    children: baseComp
  }
];

export default {
  baseComp,
  compList
};
