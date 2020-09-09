<template>
  <div class="container">
    <div class="header">
      <head-bar></head-bar>
    </div>
    <div class="main">
      <side-bar class="side" :currentPath="currPath"></side-bar>
      <div class="contain-box">
        <el-tabs
          type="card"
          @tab-remove="removeTab"
          @tab-click="handleSelect"
          :value="pageTabsValue"
          v-if="pageTabs.length"
        >
          <el-tab-pane
            :key="item.name"
            v-for="item in pageTabs"
            :label="item.show"
            :name="item.name"
            :closable="item.title !== 'home'"
          >
            <router-view />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar.vue";
import SideBar from "@/components/SideBar.vue";
import { mapGetters, mapActions } from "vuex";
// import { check } from "@/api/login.js"
export default {
  name: "Home",
  created() {
    // check()
    if (window.sessionStorage.getItem("pageObj")) {
      let pageObj = JSON.parse(window.sessionStorage.getItem("pageObj"));
      this.initTabs(pageObj);
    }
    this.addTab(this.$route.path);
  },
  data() {
    return {};
  },
  components: {
    HeadBar,
    SideBar
  },
  computed: {
    ...mapGetters(["pageTabs", "pageTabsValue", "tabIndex", "currPath"])
  },
  watch: {
    $route: "fetchRouter"
  },
  methods: {
    ...mapActions(["addTab", "removeTab", "initTabs", "selectTab"]),
    fetchRouter() {
      let nowRouter = this.$route.path;
      this.addTab(nowRouter);
    },
    handleSelect(e) {
      //路由跟随标签页变化
      let currPath = "";
      this.pageTabs.map(item => {
        if (item.name === e.name) {
          currPath = "/" + item.title;
        }
      });
      if (this.$route.path !== currPath) {
        if (currPath !== "/home") {
          this.$router.push(currPath);
        } else {
          this.$router.push({ name: "Home" });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 1920px;
  .main {
    display: flex;
    .side {
      flex: 2;
    }
    .contain-box {
      flex: 8;
      overflow: hidden;
      padding: 10px;
      // height: 800px;
      // background-color: yellowgreen;
    }
  }
}
</style>
