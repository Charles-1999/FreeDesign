export default {
  namespaced: true,

  state: {
    // 当前画布选中的元素
    focusList: [],

    eleSchema: [{
      uuid: 1,
      component: 'text',
      props: {
        text: '这是一段文字'
      },
      eleStyle: {
        top: '0px',
        left: '10px'
      },
      compStyle: {
        width: '300px',
        height: '300px'
      }
    }, {
      uuid: 2,
      component: 'text',
      props: {
        text: '这是一段文字222'
      },
      eleStyle: {
        top: '30px',
        left: '20px'
      }
    }]
  },

  mutations: {
    setFocusList(state: any, payload: any) {
      state.focusList = payload.focusList;
    },

    setEleSchema(state: any, payload: any) {
      state.eleSchema = payload.eleSchema;
    },

    addEleSchema(state: any, payloay: any) {
      state.eleSchema.push(payloay.element);
    }
  },

  actions: {
    addElement(context: any, payload: any) {
      context.commit({
        type: 'addEleSchema',
        element: payload.element
      });
    }
  }
};
