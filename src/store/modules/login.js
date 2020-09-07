
const login = {
  state: {},
  getters: {},
  mutations: {
    SET_LOGIN: (state, token) => {
      window.localStorage.setItem("token", JSON.stringify(token));
    },
    SET_LOGOUT: () => {
      window.localStorage.removeItem("token");
    }
  },
  actions: {
    setLogin({ commit }, token) {
      commit("SET_LOGIN", token);
    },
    setLogout({ commit }) {
      commit("SET_LOGOUT");
    }
  }
};

export default login;
