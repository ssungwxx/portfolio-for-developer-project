import Vue from "vue";
import Vuex from "vuex";
import RestService from "@/services/RestService";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLogin: false,
    id: null,
    grade: null
  },
  getters: {
    getIsLogin: state => {
      return state.isLogin;
    },
    getId: state => {
      return state.id;
    },
    getGrade: state => {
      return state.grade;
    }
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setId(state, id) {
      state.id = id;
    },
    setGrade(state, grade) {
      state.grade = grade;
    }
  },
  actions: {
    async setLogin({commit}) {
      if(sessionStorage.jwt) {
        commit('setIsLogin', true);
      }
      commit('setId', await RestService.getUserIdByJWT());
      commit('setGrade', await RestService.getUserGradeByJWT());
    },
    logout({commit}) {
      commit('setIsLogin', false);
      commit('setId', null);
      commit('setGrade', null);
    }
  }
});
