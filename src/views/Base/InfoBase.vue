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
          @click="handleSearch"
          v-if="!searched"
        ></el-button>
        <el-button slot="append" v-else @click="handleBack">返回</el-button>
      </el-input>
      <el-button type="success" class="add-btn" @click="toRegister"
        >新增用户</el-button
      >
    </div>
    <el-table
      ref="filterTable"
      :data="allInfo"
      style="width: 100%"
      class="table"
    >
      <el-table-column
        prop="uid"
        align="center"
        label="职工号"
        sortable
        width="150"
      >
      </el-table-column>
      <el-table-column prop="username" align="center" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="age" align="center" label="年龄" width="120">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="手机号码" width="280">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"> </el-table-column>
      <el-table-column
        prop="powerId"
        label="权限"
        width="200"
        align="center"
        :filters="[
          { text: '管理员', value: 1 },
          { text: '院长', value: 2 },
          { text: '部门主管', value: 3 },
          { text: '教务员', value: 4 },
          { text: '教师', value: 5 }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="tagType[scope.row.powerId]"
            disable-transitions
            class="tag"
            >{{ powerEnum[scope.row.powerId] }}</el-tag
          >
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
    <div class="table-pagination">
      <el-pagination
        background
        :pageSize="10"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
        :total="sum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { powerEnum } from "@/lib/enum.js";
import { getAllInfo, searchInfo } from "@/api/allInfo.js";
export default {
  created() {
    this.powerEnum = powerEnum;
    this.doGetAllInfo(1);
  },
  data() {
    return {
      isLoading: true,
      sum: 0,
      powerEnum: {},
      tagType: {
        1: "warning",
        2: "success",
        3: "success",
        4: "success",
        5: "primary"
      },
      allInfo: [],
      search: "",
      searched: false
    };
  },
  methods: {
    handlePageChange(e) {
      this.doGetAllInfo(e);
    },
    toRegister() {
      this.$router.push({ name: "UserRegister" });
    },
    filterTag(value, row) {
      return row.powerId === value;
    },
    doGetAllInfo(page) {
      getAllInfo(page)
        .then(res => {
          this.allInfo = res.data.data;
          this.sum = res.data.sum;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        })
        .catch(err => console.log(err));
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        name: "InfoModify",
        params: { mode: "admin", userObj: row }
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
    },
    async handleSearch() {
      let res = await searchInfo(this.search);
      if (res.success) {
        this.searched = true;
        this.allInfo = res.data.data;
        this.sum = res.data.sum;
        this.search = "";
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    handleBack() {
      this.searched = false;
      this.doGetAllInfo(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1540px;
  height: 770px;
  position: relative;
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
  .table-pagination {
    width: 100%;
    position: absolute;
    top: 720px;
    display: flex;
    justify-content: center;
  }
}
</style>
