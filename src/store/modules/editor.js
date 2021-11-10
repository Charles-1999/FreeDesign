import history from './editor-history';
import project from './project';

import { pageCommonStyle } from '@utils/style';

export default {
  namespaced: true,

  state: {
    // 当前画布选中的元素
    focusList: [],

    eleSchema: [],

    projectData: {
      title: '',
      width: 375,
      height: 645,
      scale: 1,
      pages: [{
        uuid: Date.now(),
        elements: [],
        pageStyle: { ...pageCommonStyle },
        config: {}
      }],
      pageModel: 0
    },

    currPageIdx: 0,

    // 拖拽有效区域
    validMoveArea: null
  },

  mutations: {
    ...project.mutations,

    // --------------- focusList ---------------
    SET_FOCUSLIST(state, focusList) {
      state.focusList = focusList;
    },

    ADD_FOCUS(state, uuid) {
      state.focusList.push(uuid);
    },

    // --------------- 有效拖拽区域 ---------------
    SET_VALID_MOVE_AREA(state, validMoveArea) {
      state.validMoveArea = validMoveArea;
    }
  },

  actions: {
    ...project.actions
  },

  getters: {
    ...project.getters
  },

  modules: {
    history
  }
};
