<template>
  <div class="container" v-loading="isLoading">
    <div class="header">
      <el-input
        placeholder="请输入职工号或名字"
        v-model="search"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          v-if="!searched"
        ></el-button>
        <el-button slot="append" v-else>返回</el-button>
      </el-input>
      <el-button type="success" class="add-btn">新增用户</el-button>
    </div>
    <el-table
      ref="filterTable"
      :data="allInfo"
      style="width: 100%"
      class="table"
    >
      <el-table-column
        prop="fid"
        align="center"
        label="职工号"
        sortable
        width="150"
      >
      </el-table-column>
      <el-table-column prop="name" align="center" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="age" align="center" label="年龄" width="120">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="手机号码" width="280">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"> </el-table-column>
      <el-table-column
        prop="power"
        label="职位/部门"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            type="primary"
            disable-transitions
            class="tag"
            v-if="scope.row.pid"
            >{{ scope.row.positionType }}</el-tag
          >
          <el-tag type="success" disable-transitions class="tag" v-else>{{
            scope.row.sectionName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMemberFile } from "@/api/memberFile";
export default {
  created() {
    this.doGetMemberFile();
  },
  data() {
    return {
      isLoading: true,
      allInfo: [],
      search: "",
      searched: false
    };
  },
  methods: {
    doGetMemberFile() {
      getMemberFile()
        .then(res => {
          this.allInfo = res.data;
        })
        .then(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // toRegister() {
    //   this.$router.push({ name: "Register" });
    // },
    filterTag(value, row) {
      return row.power === value;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        name: "PersonFile",
        params: { mode: "admin", personFile: row }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除此用户？")
        .then(res => {
          if (res === "confirm") {
            this.$message({
              message: "假装删除成功了",
              type: "success"
            });
            console.log(row);
          } else {
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1540px;
  margin: 0 20px;
  .header {
    .input-with-select {
      margin-left: 40px;
      width: 400px;
    }
    .add-btn {
      margin-left: 910px;
    }
  }
  .tag {
    padding: 0 20px;
  }
}
</style>
