import Vue from "vue"
import Vuex from "vuex"
import RestService from "@/services/RestService"
import JWTService from "@/services/JWTService"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    isLogin: sessionStorage.getItem('isLogin'),
    user_id: JWTService.decode(sessionStorage.getItem('jwt')).user_id,
    msg: null
  },
  getters: {
    getIsAuth: state => {
      return state.isAuth;
    },
    getIsLogin: state => {
      return state.isLogin;
    },
    getUser_id: state => {
      return state.user_id;
    },
    getMsg: state => {
      return state.msg;
    }
  },
  mutations: {
    login(state) {
      state.isAuth = true;
      state.isLogin = sessionStorage.getItem('isLogin');
      state.user_id = JWTService.decode(sessionStorage.getItem('jwt')).user_id;
    },
    logout(state) {
      state.isAuth = false;
      state.isLogin = false;
      state.user_id = null;
      state.msg = null;
    },
    setMsg(state, msg) {
      state.msg = msg;
    }
  },
  actions: {
    async loginCheck({commit}, data) {
      let result = await RestService.loginUser(data);
      commit('setMsg', result.msg);
      if (result.status == 200) {
        JWTService.setLogin(result);
        commit('login');
      }
    },
    logout({commit}) {
      sessionStorage.clear();
      commit('logout');
    }
  }
});
