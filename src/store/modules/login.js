const login = {
  state: {
    user: ""
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_LOGIN: (state, data) => {
      window.localStorage.setItem("token", JSON.stringify(data.token));
      state.user = data.user;
    },
    SET_LOGOUT: () => {
      window.localStorage.removeItem("token");
    },
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    setLogin({ commit }, data) {
      commit("SET_LOGIN", data);
    },
    setLogout({ commit }) {
      commit("SET_LOGOUT");
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    }
  }
};

export default login;
