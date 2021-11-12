import http from '@utils/http.service';
import { ACCOUNT } from '@apis/login';

export default {
  state: {
    logged: false,
    user: {}
  },
  mutations: {
    SET_USER(state, user) {
      state.logged = true;
      state.user = user;
    },
    CLEAR_USER(state) {
      state.logged = false;
      state.user = {};
    }
  },
  actions: {
    async login(context, data) {
      const { commit } = context;
      await http.post(ACCOUNT.LOGIN, data);
      const res = await http.get(ACCOUNT.GETME);
      commit('SET_USER', res);
    },
    async logout(context) {
      const { commit } = context;
      await http.post(ACCOUNT.LOGOUT);
      commit('CLEAR_USER');
    },
    async getMe(context) {
      const { commit } = context;
      const res = await http.get(ACCOUNT.GETME);
      commit('SET_USER', res);
    }
  },
  getters: {
    isLogged: state => state.logged
  }
};
