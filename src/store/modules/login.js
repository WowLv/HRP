const login = {
  state: {
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    SET_LOGIN: (state, token) => {
      state.isLogin = true;
      window.localStorage.setItem("token", JSON.stringify(token));
    },
    SET_LOGOUT: state => {
      state.isLogin = false;
      window.localStorage.removeItem("token");
    }
  },
  actions: {
    setLogin({ commit }) {
      commit("SET_LOGIN");
    },
    setLogout({ commit }) {
      commit("SET_LOGOUT");
    }
  }
};

export default login;
