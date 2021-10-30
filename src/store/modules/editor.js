import Vue from 'vue';
import history from './editor-history';

import { commonStyle } from '../../utils/style';

export default {
  namespaced: true,

  state: {
    // 当前画布选中的元素
    focusList: [],

    eleSchema: [],

    // 拖拽有效区域
    validMoveArea: null
  },

  mutations: {
    SET_FOCUSLIST(state, focusList) {
      state.focusList = focusList;
    },

    ADD_FOCUS(state, uuid) {
      state.focusList.push(uuid);
    },

    setEleSchema(state, payload) {
      state.eleSchema = payload.eleSchema;
    },

    ADD_ELEMENT(state, element) {
      state.eleSchema.push(element);
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

    UPDATE_ELEMENT_STYLE(state, payload) {
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
    },

    SET_VALID_MOVE_AREA(state, validMoveArea) {
      state.validMoveArea = validMoveArea;
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
      element.compStyle = {
        ...commonStyle,
        ...defaultStyle
      };

      // 2. 添加元素
      context.commit('ADD_ELEMENT', element);
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

      context.commit('UPDATE_ELEMENT_STYLE', {
        uuid,
        compStyle,
        eleStyle
      });

      return context.getters.getElementByUUID(uuid);
    },

    /**
     * 移动元素
     * @param context context
     * @param payload payload
     * @param payload.eleStyle 拖拽前的元素样式
     */
    elementMove(context, payload) {
      const { uuid, moveX, moveY, eleStyle } = payload;

      const { left, top } = eleStyle;

      context.commit('UPDATE_ELEMENT_STYLE', {
        uuid,
        eleStyle: {
          left: left + moveX,
          top: top + moveY
        }
      });

      return context.getters.getElementByUUID(uuid);
    }
  },

  getters: {
    getElementByUUID: (state) => (uuid) => state.eleSchema.find(_ => _.uuid === uuid),

    currElement: (state) => state.eleSchema.find(_ => _.uuid === state.focusList[0])
  },

  modules: {
    history
  }
};
