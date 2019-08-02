import Vue from "vue"
import Vuex from "vuex"
import RestService from "@/services/RestService"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAuth: false
  },
  getters: {
    getIsAuth: state => {
      return state.isAuth;
    }
  },
  mutations: {
    login(state, isAuth) {
      state.isAuth = isAuth;
    }
  },
  actions: {
    async loginCheck({
      commit
    }, data) {
      console.log(data);
      var result = await RestService.loginUser(data);
      console.log(result);
      if (result.status == 200) {
        commit('login', true);
      }
    }
  }
});
