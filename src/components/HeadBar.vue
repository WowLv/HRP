<template>
  <div class="container">
    <div class="header">
      <div class="title">绩效考核管理系统</div>
      <div class="util">
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      linkList: [
        { index: 0, name: "主页", icon: "icon-home" },
        { index: 1, name: "个人", icon: "icon-setting" },
        { index: 2, name: "退出系统", icon: "icon-sign-out" }
      ]
    };
  },
  computed: {},
  methods: {
    ...mapActions(["setLogout"]),
    handleClick(currIndex) {
      switch (currIndex) {
        case 0:
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
          break;
        case 2:
          this.setLogout();
          this.$router.push("/login");
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
  height: 80px;
  background-color: $theme-color;
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
      color: #333333;
    }
    .util {
      float: right;
      display: flex;
      .link-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 120px;
        height: 80px;
        box-sizing: border-box;
        &:hover {
          background-color: #454a50;
          cursor: pointer;
        }
        .iconfont {
          font-size: 28px;
        }
        span {
          text-align: center;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
