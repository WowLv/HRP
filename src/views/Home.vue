<template>
  <div class="container">
    <div class="header">
      <head-bar></head-bar>
    </div>
    <div class="main">
      <side-bar class="side" :currentPath="currPath"></side-bar>
      <div class="contain-box">
        <el-tabs
          class="tabs"
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
    this.doGetNotice(this.uid, this.power - 1);
  },
  data() {
    return {};
  },
  components: {
    HeadBar,
    SideBar
  },
  computed: {
    ...mapGetters([
      "pageTabs",
      "pageTabsValue",
      "tabIndex",
      "currPath",
      "uid",
      "power"
    ])
  },
  watch: {
    $route: "fetchRouter"
  },
  methods: {
    ...mapActions([
      "addTab",
      "removeTab",
      "initTabs",
      "selectTab",
      "setNoticeList"
    ]),
    async doGetNotice(fid, positionId) {
      let res = await getNotice(fid, positionId);
      if (res.success) {
        res.data.map(item => {
          this.notice(item);
        });
      }
    },
    notice(data) {
      let { noticeType, noticeSource, noticeTypeId, noticeId } = data,
        color = ["#3399ff", "#00cc00", "#ff6600"];
      setTimeout(() => {
        this.setNoticeList({
          id: noticeId,
          msg: `您有一条${noticeType}的${noticeSource}申请信息`
        });
        this.$notify({
          title: "新通知",
          duration: 10000,
          message: this.$createElement(
            "div",
            { style: `color: ${color[noticeTypeId - 1]}; font-size: 16px` },
            `您有一条${noticeType}的${noticeSource}申请信息`
          )
        });
      }, 0);
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
      width: 1540;
      overflow: hidden;
      padding: 10px;
      .tabs {
        width: 1540px;
      }
    }
  }
}
</style>
