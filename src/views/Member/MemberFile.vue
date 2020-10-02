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
      <el-button type="success" class="add-btn" @click="toRegister"
        >新增人员档案</el-button
      >
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
      <el-table-column prop="power" label="职位" width="200" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="tagType[scope.row.positionId]"
            disable-transitions
            class="tag"
            >{{ scope.row.positionName }}</el-tag
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
import { getMemberFile } from "@/api/memberFile";
export default {
  created() {
    this.doGetMemberFile();
  },
  data() {
    return {
      sum: 0,
      isLoading: true,
      allInfo: [],
      search: "",
      searched: false,
      tagType: {
        1: "warning",
        2: "warning",
        3: "success",
        4: "primary"
      }
    };
  },
  methods: {
    async doGetMemberFile(page) {
      let res = await getMemberFile(page);
      if (res.success) {
        this.allInfo = res.data.data;
        this.sum = res.data.sum;
        console.log(res.data);
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    handlePageChange(e) {
      this.doGetMemberFile(e);
    },
    toRegister() {
      this.$router.push({ name: "MemberRegister" });
    },
    filterTag(value, row) {
      return row.power === value;
    },
    handleEdit(index, row) {
      let type = "";
      if (row.positionId === 4) {
        type = "teacher";
      } else if (row.positionId === 3) {
        type = "section";
      }
      this.$router.push({
        name: "PersonFile",
        params: {
          mode: "admin",
          fid: row.fid,
          type
        }
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
