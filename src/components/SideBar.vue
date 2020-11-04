<template>
  <div class="container">
    <el-row class="collapse-row">
      <el-menu
        :default-active="nowCurrPath"
        class="menu-main"
        background-color="#2F4050"
        text-color="#b8b8b8"
        active-text-color="#BBAE7A"
        collapse
        unique-opened
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="icon-item-big el-icon-menu"></i>
            <span>系统管理</span>
          </template>
          <el-submenu index="1-1" v-if="[1].includes(power)">
            <template slot="title">基础设置</template>
            <el-menu-item index="/info_base">用户信息</el-menu-item>
            <el-menu-item index="/section_base">部门基础</el-menu-item>
            <el-menu-item index="/station_base">岗位基础</el-menu-item>
            <el-menu-item index="/position_base">职位基础</el-menu-item>
            <el-menu-item index="/workLoad_base">工作量基础</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">个人中心</template>
            <el-menu-item index="/info_modify">个人信息</el-menu-item>
            <el-menu-item index="/pw_modify">密码修改</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon-item-big el-icon-s-marketing"></i>
            <span>绩效考核管理</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">岗位管理</template>
            <el-menu-item index="/s_transfer_apply" v-if="[1, 7].includes(power)">调岗申请</el-menu-item>
            <el-menu-item index="/p_transfer_apply">调职申请</el-menu-item>
            <el-menu-item index="/transfer_manage" v-if="[1, 2, 3, 4].includes(power)">职/岗位审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">人员管理</template>
            <el-menu-item index="/person_file">个人档案</el-menu-item>
            <el-menu-item index="/member_file" v-if="[1, 2, 3, 4].includes(power)">人员档案</el-menu-item>
            <el-menu-item index="/entry_apply" v-if="[1, 2, 3, 4].includes(power)">入职申请</el-menu-item>
            <el-menu-item index="/resign_apply">离职申请</el-menu-item>
            <el-menu-item index="/e_r_manage" v-if="[1, 2, 3, 4].includes(power)">入/离职审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">部门管理</template>
            <el-menu-item index="/section_apply" v-if="[1, 2, 3, 4, 5, 6].includes(power)">部门申请</el-menu-item>
            <el-menu-item index="/section_manage" v-if="[1, 2, 3].includes(power)">部门审核</el-menu-item>
            <el-menu-item index="/section_file" v-if="[1, 2, 3, 4, 5, 6].includes(power)">部门档案</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <template slot="title">教务管理</template>
            <el-menu-item index="/teach_add" v-if="[1, 7].includes(power)">加课报备</el-menu-item>
            <el-menu-item index="/teach_minus" v-if="[1, 7].includes(power)">请假报备</el-menu-item>
          </el-submenu>
          <el-submenu index="2-5">
            <template slot="title">工作量管理</template>
            <el-menu-item index="/teach_load" v-if="[1, 2, 3, 5].includes(power)">基础教学工作量</el-menu-item>
            <el-menu-item index="/scientific_load" v-if="[1, 7].includes(power)">教科研工作量</el-menu-item>
            <el-menu-item index="/public_load" v-if="[1, 7].includes(power)">公共工作量</el-menu-item>
            <el-menu-item index="/load_manage" v-if="[1, 2, 3, 6].includes(power)">工作量审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-6">
            <template slot="title">绩效考核管理</template>
            <el-menu-item index="/evaluate" v-if="[1, 2, 3, 4].includes(power)">绩效考核</el-menu-item>
            <el-menu-item index="/person_evaluation" v-if="[1, 7].includes(power)">个人绩效</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-row>
    <el-row class="expand-row">
      <el-menu
        :default-active="nowCurrPath"
        class="menu-main"
        background-color="#2F4050"
        text-color="#b8b8b8"
        active-text-color="#BBAE7A"
        unique-opened
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="icon-item-big el-icon-menu"></i>
            <span>系统管理</span>
          </template>
          <el-submenu index="1-1" v-if="[1].includes(power)">
            <template slot="title">基础设置</template>
            <el-menu-item index="/info_base">用户信息</el-menu-item>
            <el-menu-item index="/section_base">部门基础</el-menu-item>
            <el-menu-item index="/station_base">岗位基础</el-menu-item>
            <el-menu-item index="/position_base">职位基础</el-menu-item>
            <el-menu-item index="/workLoad_base">工作量基础</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">个人中心</template>
            <el-menu-item index="/info_modify">个人信息</el-menu-item>
            <el-menu-item index="/pw_modify">密码修改</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon-item-big el-icon-s-marketing"></i>
            <span>绩效考核管理</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">岗位管理</template>
            <el-menu-item index="/s_transfer_apply" v-if="[1, 7].includes(power)">调岗申请</el-menu-item>
            <el-menu-item index="/p_transfer_apply">调职申请</el-menu-item>
            <el-menu-item index="/transfer_manage" v-if="[1, 2, 3, 4].includes(power)">职/岗位审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <template slot="title">人员管理</template>
            <el-menu-item index="/person_file">个人档案</el-menu-item>
            <el-menu-item index="/member_file" v-if="[1, 2, 3, 4].includes(power)">人员档案</el-menu-item>
            <el-menu-item index="/entry_apply" v-if="[1, 2, 3, 4].includes(power)">入职申请</el-menu-item>
            <el-menu-item index="/resign_apply">离职申请</el-menu-item>
            <el-menu-item index="/e_r_manage" v-if="[1, 2, 3, 4].includes(power)">入/离职审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <template slot="title">部门管理</template>
            <el-menu-item index="/section_apply" v-if="[1, 2, 3, 4, 5, 6].includes(power)">部门申请</el-menu-item>
            <el-menu-item index="/section_manage" v-if="[1, 2, 3].includes(power)">部门审核</el-menu-item>
            <el-menu-item index="/section_file" v-if="[1, 2, 3, 4, 5, 6].includes(power)">部门档案</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <template slot="title">教务管理</template>
            <el-menu-item index="/teach_add" v-if="[1, 7].includes(power)">加课报备</el-menu-item>
            <el-menu-item index="/teach_minus" v-if="[1, 7].includes(power)">请假报备</el-menu-item>
          </el-submenu>
          <el-submenu index="2-5">
            <template slot="title">工作量管理</template>
            <el-menu-item index="/teach_load" v-if="[1, 2, 3, 5].includes(power)">基础教学工作量</el-menu-item>
            <el-menu-item index="/scientific_load" v-if="[1, 7].includes(power)">教科研工作量</el-menu-item>
            <el-menu-item index="/public_load" v-if="[1, 7].includes(power)">公共工作量</el-menu-item>
            <el-menu-item index="/load_manage" v-if="[1, 2, 3, 6].includes(power)">工作量审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2-6">
            <template slot="title">绩效考核管理</template>
            <el-menu-item index="/evaluate" v-if="[1, 2, 3, 4].includes(power)">绩效考核</el-menu-item>
            <el-menu-item index="/person_evaluation" v-if="[1, 7].includes(power)">个人绩效</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
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
  computed: {
    ...mapGetters(["power"]),
    nowCurrPath() {
      return this.currentPath;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 5px;
  .menu-main {
    height: 865px;
    .icon-item-small {
      font-size: 18px;
      color: #999;
      margin-right: 10px;
    }
    .icon-item-big {
      font-size: 24px;
      color: #fff;
    }
  }
  .collapse-row,
  .expand-row {
    display: none;
  }
  @media screen and (max-width: 1780px) {
    .collapse-row {
      display: block;
    }
  }
  @media screen and (min-width: 1780px) {
    .expand-row {
      display: block;
    }
  }
}
</style>
