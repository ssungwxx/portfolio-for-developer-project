import Vue from "vue";
import Vuex from "vuex";
import RestService from "services"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user_name: "",
    user_grade: "",
    isAuth: false
  },
  getters: {
    getUser: state => state.user_name,
    getGrade: state => state.user_grade,
    getIsAuth: state => state.isAuth
  },
  mutations: {
    LOGIN(state, {
      user_name,
      user_grade
    }) {
      state.user_name = user_name;
      state.user_grade = user_grade;
    },
    IS_AUTH(state, {
      isAuth
    }) {
      state.isAuth = isAuth;
    },
    LOGOUT(state) {
      state.user_name = null;
      state.user_grade = null;
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
      if (result.status == 200) {
        // var data = {
        //   result.user_name,
        //   result.user_grade
        // };
        commit('LOGIN', data);
        commit('IS_AUTH', true);
        return state.isAuth;
      }
    },
    logout({
      commit
    }) {
      commit('LOGOUT');
    }
  }
});
