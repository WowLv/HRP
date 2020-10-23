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
            :closable="item.title !== 'center'"
          >
          </el-tab-pane>
          <router-view />
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar.vue";
import SideBar from "@/components/SideBar.vue";
import { mapGetters, mapActions } from "vuex";
import { getNotice } from "@/api/notification";
export default {
  name: "Home",
  created() {
    // check()
    if (window.sessionStorage.getItem("pageObj")) {
      let pageObj = JSON.parse(window.sessionStorage.getItem("pageObj"));
      this.initTabs(pageObj);
    }
    this.addTab(this.$route.path);
    this.doGetNotice(this.uid);
    // this.$notify({
    //   title: "您有一条新通知",
    //   message: this.$createElement(
    //     "div",
    //     { style: "color: teal" },
    //     "我是你爹！我是你爹！我是你爹！我是你爹！我是你爹！"
    //   )
    // });
  },
  data() {
    return {};
  },
  components: {
    HeadBar,
    SideBar
  },
  computed: {
    ...mapGetters(["pageTabs", "pageTabsValue", "tabIndex", "currPath", "uid"])
  },
  watch: {
    $route: "fetchRouter"
  },
  methods: {
    ...mapActions(["addTab", "removeTab", "initTabs", "selectTab"]),
    async doGetNotice(fid) {
      let res = await getNotice(fid);
      if (res.success) {
        console.log(res.data);
        // let finishNum = res.data.filter(item => {
        //   return item.noticeModeId === 3;
        // }).length;
        let uncheckNum = res.data.filter(item => {
          return item.noticeModeId === 1;
        }).length;
        let checkNum = res.data.filter(item => {
          return item.noticeModeId === 2;
        }).length;

        if (uncheckNum) {
          //待审核消息
          setTimeout(() => {
            this.$notify({
              title: "新通知",
              duration: 10000,
              message: this.$createElement(
                "div",
                { style: "color: #00CD66" },
                `您有${uncheckNum}条待审核信息`
              )
            });
          }, 0);
        }
        if (checkNum) {
          //已审核消息
          setTimeout(() => {
            this.$notify({
              title: "新通知",
              duration: 10000,
              message: this.$createElement(
                "div",
                { style: "color: #00CED1" },
                `您有${checkNum}条审核完成的信息`
              )
            });
          }, 0);
        }
      }
    },
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
        if (currPath !== "/center") {
          this.$router.push(currPath);
        } else {
          this.$router.push({ name: "Center" });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  // width: 1920px;
  width: 100%;
  .main {
    display: flex;
    justify-content: center;
    .side {
      flex: 1;
    }
    @media screen and (max-width: 1780px) {
      .side {
        flex: 0.5;
      }
      .contain-box {
        flex: 9.5;
      }
    }
    .contain-box {
      // flex: 8;
      width: 1540;
      overflow: hidden;
      padding: 10px;
      // max-width: 1350px;
      // height: 800px;
      // background-color: yellowgreen;
    }
  }
}
</style>
