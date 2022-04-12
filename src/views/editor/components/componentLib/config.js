export const baseComp = {
  text: {
    label: '文本',
    icon: 'icon-wenben',
    size: 20
  },
  rect: {
    label: '矩形',
    icon: 'icon-juxing',
    size: 20
  },
  image: {
    label: '图片',
    icon: 'icon-tupian',
    size: 20
  },
  line: {
    label: '分割线',
    icon: 'icon-fengexian1',
    size: 20
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
