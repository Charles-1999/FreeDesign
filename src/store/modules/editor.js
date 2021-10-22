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
    }
  },

  actions: {
    /**
     * 添加元素
     * @param context context
     * @param payload payload
     */
    addElement(context, payload) {
      context.commit({
        type: 'addEleSchema',
        element: payload.element
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
    }
  }
};
