import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 标识用户是否登录
    isLogined: localStorage.getItem("isLogined")
      ? localStorage.getItem("isLogined")
      : 0,
    // paused: true,
  },
  mutations: {
    logined(state) {
      state.isLogined = 1;
    },
    logout(state) {
      state.isLogined = 0;
      localStorage.removeItem("isLogined");
    },
  },
  actions: {},
  modules: {},
});
