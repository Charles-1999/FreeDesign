import Vue from 'vue';

export default {
  namespaced: true,

  state: {
    // 当前画布选中的元素
    focusList: [],

    eleSchema: []
  },

  mutations: {
    setFocusList(state, payload) {
      state.focusList = payload.focusList;
    },

    setEleSchema(state, payload) {
      state.eleSchema = payload.eleSchema;
    },

    addEleSchema(state, payloay) {
      state.eleSchema.push(payloay.element);
    },

    updateElement(state, payload) {
      const { uuid } = payload;
      const index = state.eleSchema.findIndex(_ => _.uuid === uuid);

      const element = {
        ...state.eleSchema[index],
        ...payload
      };

      Vue.set(state.eleSchema, index, element);
    },

    updateElementStyle(state, payload) {
      const { uuid, compStyle, eleStyle } = payload;
      const index = state.eleSchema.findIndex(_ => _.uuid === uuid);
      const element = state.eleSchema[index];

      element.compStyle = {
        ...element.compStyle,
        ...compStyle
      };

      element.eleStyle = {
        ...element.eleStyle,
        ...eleStyle
      };

      Vue.set(state.eleSchema, index, element);
    }
  },

  actions: {
    /**
     * 添加元素
     * @param context context
     * @param payload payload
     */
    addElement(context, payload) {
      const { element } = payload;
      const { component } = element;

      // 1. 加载组件的默认样式
      const libComp = require.context(
        // 其组件目录的相对路径
        '../../components/lib',
        // 是否查询其子目录
        true,
        // 匹配基础组件文件名的正则表达式
        /\.\/(\w+\/config\.js$)/
      );
      const fileName = component.replace(component[0], component[0].toUpperCase());
      const compConfig = libComp(`./${fileName}/config.js`);

      const { defaultStyle } = compConfig;
      element.compStyle = defaultStyle;

      // 2. 添加元素
      context.commit({
        type: 'addEleSchema',
        element
      });
    },

    /**
     * 设置组件样式
     * @param context context
     * @param payload payload
     */
    setCompStyle(context, payload) {
      const { uuid, compStyle } = payload;

      const element = context.state.eleSchema
        .find(_ => _.uuid === uuid);

      element.compStyle = compStyle;
    },

    /**
     * 更新样式
     * @param context context
     * @param payload payload
     */
    updateStyle(context, payload) {
      const { uuid, compStyle = {}, eleStyle = {} } = payload;

      context.commit({
        type: 'updateElementStyle',
        uuid,
        compStyle,
        eleStyle
      });
    }
  }
};
