import page from './page';

export default {
  namespaced: true,

  mutations: {
    ...page.mutations
  },

  actions: {
    ...page.actions

  },

  getters: {
    ...page.getters
  }
};
