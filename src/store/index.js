import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import editor from './modules/editor';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inEditor: false
  },
  mutations: {
    SET_INEDITOR(state, payload) {
      state.inEditor = payload;
    }
  },
  actions: {
  },
  modules: {
    auth,
    editor
  }
});
