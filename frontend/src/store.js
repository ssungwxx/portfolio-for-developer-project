import Vue from "vue";
import Vuex from "vuex";
import RestService from "@/services/RestService"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false
  },
  getters: {
    getIsAuth: state => state.isAuth
  },
  mutations: {
    IS_AUTH(state, {
      isAuth
    }) {
      state.isAuth = isAuth;
    },
    LOGOUT(state) {
      state.isAuth = false;
    }
  },
  actions: {
    async login({
      commit
    }, {
      user_id,
      user_pw
    }) {
      var result = await RestService.loginUser({
        user_id,
        user_pw
      });
      console.log(result);
      if (result.status == 200) {
        commit('IS_AUTH', true);
        return this.getters.getIsAuth;
      }
    },
    logout({
      commit
    }) {
      commit('LOGOUT');
    }
  }
});
