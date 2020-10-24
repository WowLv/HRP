<template>
  <div class="container">
    <div class="header">
      <div class="title" text="绩效考核管理系统">绩效考核管理系统</div>
      <div class="util">
        <div class="link-box">
          <span class="iconfont icon-account"></span><span>{{ username }}</span>
        </div>
        <div
          class="link-box"
          v-for="item in linkList"
          :key="item.index"
          @click="handleClick(item.index)"
        >
          <span class="iconfont" :class="item.icon"></span
          ><span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      linkList: [
        { index: 0, name: "主页", icon: "icon-home" },
        { index: 1, name: "退出系统", icon: "icon-sign-out" }
      ]
    };
  },
  computed: {
    ...mapGetters(["username"])
  },
  methods: {
    ...mapActions(["setLogout"]),
    handleClick(currIndex) {
      switch (currIndex) {
        case 0:
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
          break;
        case 1:
          this.setLogout();
          this.$router.push({ name: "Login" });
          this.$message({
            message: "已退出",
            type: "warning"
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1920px;
  min-width: 1125px;
  width: 100%;
  height: 80px;
  background-color: $theme-back-color;
  .header {
    width: 100%;
    height: 100%;
    .title {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      float: left;
      margin-left: 50px;
      width: 300px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 28px;
      color: #888;
      &:before {
        content: attr(text);
        position: absolute;
        z-index: 10;
        color: #147dbe;
        mask: linear-gradient(to left, #147dbe, transparent);
      }
    }
    .util {
      float: right;
      display: flex;
      align-items: center;
      .user-name {
        margin-right: 100px;
        font-size: 20px;
      }
      .link-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 120px;
        height: 80px;
        box-sizing: border-box;
        &:hover {
          background-color: $theme-activeBack-color;
          cursor: pointer;
          span {
            color: $theme-active-color;
          }
        }
        .iconfont {
          font-size: 28px;
        }
        span {
          text-align: center;
          color: $theme-text-color;
        }
      }
    }
  }
}
</style>
