<template>
  <div class="container">
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="未审批" name="unfinish">
        <el-table :data="applyData" class="table">
          <el-table-column
            prop="createTime"
            label="申请时间"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="admin"
            label="负责人"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="applicant"
            label="姓名"
            align="center"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="申请描述"
            align="center"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop="applyType"
            label="申请类型"
            width="280"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.aid === 1 ? 'primary' : 'warning'"
                disable-transitions
                class="tag"
                >{{ scope.row.applyType }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="280"
            align="center"
            class="form-item"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="form-btn"
                @click="handldPass(scope.row.mid)"
                >通过</el-button
              >
              <el-button
                type="danger"
                class="form-btn"
                @click="handleReject(scope.row.mid)"
                >驳回</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="finished">
        <el-table :data="finishedData" class="table">
          <el-table-column
            prop="createTime"
            label="审核时间"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="admin"
            label="负责人"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="applicant"
            label="姓名"
            width="180"
          ></el-table-column>
          <el-table-column prop="reason" label="申请描述" width="300">
          </el-table-column>
          <el-table-column
            prop="applyType"
            label="申请类型"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.aid === 1 ? 'primary' : 'warning'"
                disable-transitions
                class="tag"
                >{{ scope.row.applyType }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="200"
            align="center"
            class="form-item"
          >
            <template slot-scope="scope">
              <el-tag class="tag" type="success" v-if="scope.row.modeId === 1"
                >已通过</el-tag
              >
              <el-tag class="tag" type="danger" v-if="scope.row.modeId === 2"
                >未通过</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
            class="form-item"
          >
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.row.mid)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getAllMenberApply,
  passMenberApply,
  rejectMenberApply
} from "@/api/memberFile";
export default {
  created() {
    this.doGetAllMenberApply();
  },
  data() {
    return {
      isLoading: true,
      activeName: "unfinish",
      applyData: [],
      finishedData: []
    };
  },
  methods: {
    async doGetAllMenberApply() {
      this.applyData = [];
      this.finishedData = [];
      let res = await getAllMenberApply();
      if (res.success) {
        //判断是否审批过
        if (res.data.length) {
          res.data.map(item => {
            if (item.modeId === 0) {
              this.applyData.push(item);
            } else {
              this.finishedData.push(item);
            }
          });
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    async handldPass(mid) {
      let res = await passMenberApply(mid);
      this.doGetAllMenberApply();
      if (res.success) {
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    },
    async handleReject(mid) {
      let res = await rejectMenberApply(mid);
      this.doGetAllMenberApply();
      if (res.success) {
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    },
    handleDelete(mid) {
      this.$message({
        message: `假装删除成功${mid}`,
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1540px;
  margin: 0 20px;
  .table {
    .tag {
      padding: 0 20px;
    }
  }
}
</style>
