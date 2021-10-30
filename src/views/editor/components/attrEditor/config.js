// 尺寸与位置
const sizeAndPosition = {
  position: {
    label: '位置',
    children: {
      left: {
        text: 'X',
        type: 'number',
        default: undefined
      },
      top: {
        text: 'Y',
        type: 'number',
        default: undefined
      }
    }
  },
  size: {
    label: '尺寸',
    children: {
      width: {
        text: '宽度（px）',
        type: 'number',
        default: undefined
      },
      height: {
        text: '高度（px）',
        type: 'number',
        default: undefined
      }
    }
  },
  rotate: {
    label: '旋转',
    type: 'el-slider',
    default: undefined,
    config: {
      min: -180,
      max: 180,
      showInput: true,
      inputSize: 'mini',
      marks: { 0: '', 90: '', '-90': '' }
    }
  }
};

// 边框边距
const borderAndPadding = {
  borderWidth: {
    label: '边框粗细',
    type: 'number',
    default: undefined
  },
  borderColor: {
    label: '边框颜色',
    type: 'color',
    default: undefined
  },
  borderRadius: {
    label: '边框弧度',
    type: 'number',
    default: undefined
  }
};

// 背景
const background = {
  backgroundColor: {
    label: '背景颜色',
    type: 'color',
    default: undefined
  }
};

export const baseAttr = [
  {
    label: '尺寸与位置',
    options: sizeAndPosition
  },
  {
    label: '边框与尺寸',
    options: borderAndPadding
  },
  {
    label: '背景',
    options: background
  }
];

export default {
  baseAttr
};
