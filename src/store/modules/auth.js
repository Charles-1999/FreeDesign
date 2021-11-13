import http from '@utils/http.service';
import { ACCOUNT } from '@apis/login';

export default {
  namespaced: true,

  state: {
    logged: false,
    user: {}
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOGGED(state, logged) {
      state.logged = logged;
    }
  },

  actions: {
    async login(context, data) {
      const { dispatch } = context;

      // 1. 登录
      await http.post(ACCOUNT.LOGIN, data);

      // 2. 获取个人信息
      await dispatch('getMe');
    },

    async logout(context) {
      const { commit } = context;
      await http.post(ACCOUNT.LOGOUT);
      commit('SET_USER', {});
    },

    async getMe(context) {
      const { commit } = context;

      const res = await http.get(ACCOUNT.GETME);
      commit('SET_USER', res || null);

      return Promise.resolve();
    }
  },

  getters: {
    isLogged: state => state.logged
  }
};
