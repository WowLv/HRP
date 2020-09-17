const login = {
  state: {
    user: {
      uid: "",
      username: "",
      power: ""
    }
  },
  getters: {
    uid: state => state.user.uid,
    power: state => state.user.power,
    username: state => state.user.username
  },
  mutations: {
    SET_LOGIN: (state, data) => {
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      state.user.uid = data.uid;
      state.user.power = data.pid;
      state.user.username = data.username;
    },
    SET_LOGOUT: () => {
      localStorage.removeItem("token");
    },
    SET_USER: (state, user) => {
      state.user.uid = user.uid;
      state.user.power = user.pid;
      state.user.username = user.username;
    }
  },
  actions: {
    setLogin({ commit }, data) {
      console.log(data);
      commit("SET_LOGIN", data);
    },
    setLogout({ commit }) {
      commit("SET_LOGOUT");
    },
    setUser({ commit }, user) {
      console.log(user);
      commit("SET_USER", user);
    }
  }
};

export default login;
