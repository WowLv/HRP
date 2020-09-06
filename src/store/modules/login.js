const login = {
  state: {
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin
  },
  mutations: {
    SET_LOGIN: state => {
      state.isLogin = true;
      window.localStorage.setItem("auth", JSON.stringify(state.isLogin));
    },
    SET_LOGOUT: state => {
      state.isLogin = false;
      window.localStorage.setItem("auth", JSON.stringify(state.isLogin));
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
