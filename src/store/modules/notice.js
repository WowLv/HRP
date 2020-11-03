const notice = {
  state: {
    noticeList: []
  },
  getters: {
    noticeList: state => state.noticeList
  },
  mutations: {
    SET_NOTICELIST: (state, noticeObj) => {
      state.noticeList.push(noticeObj);
    },
    CLEAR_NOTICELIST: state => {
      state.noticeList = [];
    }
  },
  actions: {
    setNoticeList({ commit }, noticeObj) {
      commit("SET_NOTICELIST", noticeObj);
    },
    clearNoticeList({ commit }) {
      commit("CLEAR_NOTICELIST");
    }
  }
};
export default notice;
