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
  pageStyleFormConfig
};
