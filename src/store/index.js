import Vuex from "vuex";
import Vue from "vue";
import page from "./modules/page.js";
import login from "./modules/login.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    page,
    login
  }
});
