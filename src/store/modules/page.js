import router from "@/router";
import pageEnum from "@/lib/pageEnum.js";
const pages = {
  state: {
    pageTabs: [],
    pageTabsValue: "0",
    tabIndex: 0,
    currPath: "/"
  },
  getters: {
    pageTabs: state => state.pageTabs,
    pageTabsValue: state => state.pageTabsValue,
    tabIndex: state => state.tabIndex,
    currPath: state => state.currPath
  },
  mutations: {
    INIT_TABS: (state, tabObj) => {
      state.pageTabs = tabObj.pageTabs;
      state.pageTabsValue = tabObj.pageTabsValue;
      state.tabIndex = tabObj.tabIndex;
      state.currPath = tabObj.currPath;
    },
    ADD_TAB: (state, nowRouter) => {
      state.currPath = nowRouter;
      let isExist = false;
      if (nowRouter === "/") isExist = true;
      state.pageTabs.map(item => {
        if (item.title === nowRouter.replace("/", "")) {
          isExist = true;
        }
      });
      //   //标签页跟随路由变化
      if (!isExist) {
        let newTabName = ++state.tabIndex + "";
        state.pageTabs.push({
          show: pageEnum[nowRouter.replace("/", "")],
          title: nowRouter.replace("/", ""),
          name: newTabName
        });
        state.pageTabsValue = newTabName;
      } else {
        let currName = "";
        state.pageTabs.map(item => {
          if (item.title === nowRouter.replace("/", "")) {
            currName = item.name;
          }
        });
        state.pageTabsValue = currName;
      }
      window.sessionStorage.setItem(
        "pageObj",
        JSON.stringify({
          pageTabs: state.pageTabs,
          pageTabsValue: state.pageTabsValue,
          tabIndex: state.tabIndex,
          currPath: state.currPath
        })
      );
    },
    REMOVE_TAB: (state, targetName) => {
      let tabs = state.pageTabs;
      let activeName = state.pageTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              router.push(`/${nextTab.title}`);
            } else {
              router.push(`/`);
            }
          }
        });
      }

      state.pageTabsValue = activeName;
      state.pageTabs = tabs.filter(tab => tab.name !== targetName);
      window.sessionStorage.setItem(
        "pageObj",
        JSON.stringify({
          pageTabs: state.pageTabs,
          pageTabsValue: state.pageTabsValue,
          tabIndex: state.tabIndex,
          currPath: state.currPath
        })
      );
    },
    SELECT_TAB: (state, el) => {
      let currPath = "";
      state.pageTabs.map(item => {
        if (item.name === el.name) {
          currPath = "/" + item.title;
        }
      });
      router.push(`/${currPath}`);
    },
    CLEAR_TAB: state => {
      state.pageTabs = [];
      state.pageTabsValue = "0";
      state.tabIndex = 0;
      state.currPath = "/";
      window.sessionStorage.removeItem("pageObj");
    }
  },
  actions: {
    initTabs({ commit }, tabObj) {
      commit("INIT_TABS", tabObj);
    },
    addTab({ commit }, nowRouter) {
      commit("ADD_TAB", nowRouter);
    },
    removeTab({ commit }, targetName) {
      commit("REMOVE_TAB", targetName);
    },
    selectTab({ commit }, el) {
      commit("SELECT_TAB", el);
    },
    clearTab({ commit }) {
      commit("CLEAR_TAB");
    }
  }
};

export default pages;
