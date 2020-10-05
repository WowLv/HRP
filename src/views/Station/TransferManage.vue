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
            prop="fid"
            label="负责人"
            align="center"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="applicant"
            label="姓名"
            align="center"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="申请描述"
            align="center"
            width="280"
          >
          </el-table-column>
          <el-table-column
            prop="power"
            label="职位变动"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="tagType[scope.row.positionId]"
                disable-transitions
                class="tag"
                >{{ scope.row.positionName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="applyType"
            label="岗位变动"
            width="180"
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
            width="240"
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
            prop="fid"
            label="负责人"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="applicant"
            label="姓名"
            width="160"
          ></el-table-column>
          <el-table-column prop="reason" label="申请描述" width="240">
          </el-table-column>
          <el-table-column prop="power" label="职位" width="180" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="tagType[scope.row.positionId]"
                disable-transitions
                class="tag"
                >{{ scope.row.positionName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="applyType"
            label="申请类型"
            width="180"
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
            width="180"
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
import {} from "@/api/memberFile";
export default {
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
  data() {
    return {
      isLoading: true,
      activeName: "unfinish",
      applyData: [],
      finishedData: [],
      tagType: {
        1: "warning",
        2: "warning",
        3: "success",
        4: "primary"
      }
    };
  },
  methods: {
    async handldPass() {
      this.$message({
        message: `假装通过成功`,
        type: "success"
      });
    },
    async handleReject() {
      this.$message({
        message: "假装驳回成功",
        type: "success"
      });
    },
    handleDelete() {
      this.$message({
        message: `假装删除成功`,
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
