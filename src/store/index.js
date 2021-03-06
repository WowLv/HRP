import Vuex from "vuex";
import Vue from "vue";
import page from "./modules/page";
import login from "./modules/login";
import notice from "./modules/notice";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    page,
    login,
    notice
  }
});
