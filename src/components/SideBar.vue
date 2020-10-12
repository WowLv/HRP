<template>
  <div class="container">
    <el-row class="tac">
      <el-menu
        :default-active="nowCurrPath"
        class="menu-main"
        background-color="#9FC5E8"
        text-color="#555"
        active-text-color="#F7F2DE"
        unique-opened
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">基础设置</template>
            <el-menu-item index="/info_base">用户信息</el-menu-item>
            <el-menu-item index="/map_base">数据字典档案</el-menu-item>
            <el-menu-item index="/form_base">单据格式设置</el-menu-item>
            <el-menu-item index="/time_base">考核年度</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">个人中心</template>
            <el-menu-item index="/info_modify">个人信息</el-menu-item>
            <el-menu-item index="/pw_modify">密码修改</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>绩效考核管理</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">岗位管理</template>
            <el-menu-item index="/s_transfer_apply">调岗申请</el-menu-item>
            <el-menu-item index="/p_transfer_apply">调职申请</el-menu-item>
            <el-menu-item index="/transfer_manage">职/岗位审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">人员管理</template>
            <el-menu-item index="/person_file">个人档案</el-menu-item>
            <el-menu-item index="/member_file">人员档案</el-menu-item>
            <el-menu-item index="/entry_apply">入职申请</el-menu-item>
            <el-menu-item index="/resign_apply">离职申请</el-menu-item>
            <el-menu-item index="/e_r_manage">入/离职审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">部门管理</template>
            <el-menu-item index="2-3-1">部门档案</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <template slot="title">工作量管理</template>
            <el-menu-item index="/teach_load">基础教学工作量</el-menu-item>
            <el-menu-item index="/scientific_load">教科研工作量</el-menu-item>
            <el-menu-item index="/public_load">公共工作量</el-menu-item>
            <el-menu-item index="/load_manage">工作量审核</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
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
  padding-top: 6px;
  .menu-main {
    height: 850px;
  }
}
</style>
