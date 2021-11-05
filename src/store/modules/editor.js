import history from './editor-history';
import project from './project';

// import { pageCommonStyle } from '@utils/style';

export default {
  namespaced: true,

  state: {
    // 当前画布选中的元素
    focusList: [],

    eleSchema: [],

    projectData: { title: '', width: 375, height: 645, scale: 1, pages: [{ elements: [{ uuid: 1636103274221, component: 'rect', eleStyle: { top: 50, left: 70 }, compStyle: { width: 100, height: 100, rotate: 0, boxSizing: 'border-box', padding: '0px 0px 0px 0px', borderWidth: 0, borderStyle: 'solid', borderColor: '#000', borderRadius: 0, backgroundColor: '#edfedf', backgroundClip: 'content-box', color: '#3e3e3e', fontSize: 16, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }, animations: [{ label: '渐显', name: 'fadeIn', duration: 1, delay: 0, cycle: 0 }, { label: '向左长距进入', name: 'fadeInLeftBig', duration: 1, delay: 0, cycle: 0 }] }, { uuid: 1636103292532, component: 'text', eleStyle: { top: 211, left: 113 }, compStyle: { width: 200, height: 100, rotate: 0, boxSizing: 'border-box', padding: '0px 0px 0px 0px', borderWidth: 0, borderStyle: 'solid', borderColor: '#000', borderRadius: 0, backgroundColor: undefined, backgroundClip: 'content-box', color: 'pink', fontSize: 16, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }, animations: [{ label: '向左长距进入', name: 'fadeInLeftBig', duration: 1, delay: 0, cycle: 0 }, { label: '右逆时针旋转', name: 'rotateInUpRight', duration: 1, delay: 0, cycle: 0 }] }], pageStyle: { backgroundColor: '#FBECEC', backgroundImage: [] }, config: {} }, { elements: [{ uuid: 1636103340206, component: 'rect', eleStyle: { top: 50, left: 70 }, compStyle: { width: 100, height: 100, rotate: 0, boxSizing: 'border-box', padding: '0px 0px 0px 0px', borderWidth: 0, borderStyle: 'solid', borderColor: '#000', borderRadius: 0, backgroundColor: '#edfedf', backgroundClip: 'content-box', color: '#3e3e3e', fontSize: 16, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }, animations: [] }], pageStyle: { backgroundColor: '#FBECEC', backgroundImage: [] }, config: {} }], pageModel: 0 },

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
