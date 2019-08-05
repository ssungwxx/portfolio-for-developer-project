import Vue from "vue"
import Vuex from "vuex"
import RestService from "@/services/RestService"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAuth: false,
    user_id: null,
    err_msg: null
  },
  getters: {
    getIsAuth: state => {
      return state.isAuth;
    },
    getUser_id: state => {
      return state.user_id;
    },
    getErr_msg: state => {
      return state.err_msg;
    }
  },
  mutations: {
    login(state, data) {
      state.isAuth = true;
      state.user_id = data.user_id;
      state.err_msg = null;
    },
    logout(state) {
      state.isAuth = false;
      state.user_id = null;
      state.err_msg = null;
    },
    setErr_msg(state, msg) {
      state.err_msg = msg;
    }
  },
  actions: {
    async loginCheck({
      commit
    }, data) {
      var result = await RestService.loginUser(data);
      console.log(result);
      if (result.status == 200) {
        commit('login', data);
      } else {
        commit('setErr_msg', result.msg);
      }
    }
  }
});
