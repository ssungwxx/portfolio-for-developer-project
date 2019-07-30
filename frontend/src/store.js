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
      LOGIN (state, {user_name, user_grade}) {
        state.user_name = user_name;
        state.user_grade = user_grade;
      },
      IS_AUTH (state, {isAuth}) {
        state.isAuth = isAuth;
      },
      LOGOUT (state) {
        state.user_name = null;
        state.user_grade = null;
      }
    },
    actions: {
      async login ({commit}, {user_id, user_pw}) {
        //
      }
    }
});
