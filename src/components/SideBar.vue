<template>
  <div class="container">
    <el-row class="tac">
      <!-- <el-col :span="4"> -->
      <el-menu
        :default-active="nowCurrPath"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">基础设置</template>
            <el-menu-item index="/userbase">用户档案</el-menu-item>
            <el-menu-item index="/rolebase">角色档案</el-menu-item>
            <el-menu-item index="/mapbase">数据字典档案</el-menu-item>
            <el-menu-item index="/formbase">单据格式设置</el-menu-item>
            <el-menu-item index="/timebase">考核年度</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">个人中心</template>
            <el-menu-item index="/infomodify">资料修改</el-menu-item>
            <el-menu-item index="/pwmodify">密码修改</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>绩效考核管理</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">岗位管理</template>
            <el-menu-item index="2-1-1">岗位</el-menu-item>
            <el-menu-item index="2-1-2">岗位类别</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">人员管理</template>
            <el-menu-item index="1-2-1">人员档案</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">部门管理</template>
            <el-menu-item index="2-3-1">部门档案</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <template slot="title">工作量管理</template>
            <el-menu-item index="2-4-1">工作量类型</el-menu-item>
            <el-menu-item index="2-4-1">工作量项设置</el-menu-item>
            <el-menu-item index="2-4-1">岗位目标设置</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <!-- </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    currentPath: {
      default: "/",
      type: String
    }
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    nowCurrPath() {
      return this.currentPath;
    }
  },
  // watch: {
  //   currentPath: newVal => {
  //     console.log(newVal);
  //   }
  // },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
