export const commonPageStyleFormConfig = {
  title: {
    label: '标题',
    type: 'input',
    default: '',
    config: {
      placeholder: '请输入项目标题'
    }
  },
  description: {
    label: '描述',
    type: 'input',
    default: '',
    config: {
      type: 'textarea',
      placeholder: '可输入项目描述'
    }
  },
  height: {
    label: '高度',
    type: 'number',
    default: undefined
  }
};

export const pageStyleFormConfig = {
  backgroundColor: {
    label: '背景颜色',
    type: 'color'
  },

  backgroundImage: {
    label: '背景图片',
    type: 'selectImage',
    config: {
      limit: 1
    }
  }
};

export default {
  pageStyleFormConfig,
  commonPageStyleFormConfig
};
