<template>
  <div class="container">
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="未审批" name="unfinish" class="tab-pane">
        <el-table
          ref="filterTable"
          :data="applyInfo"
          style="width: 100%"
          class="table"
          max-height="690"
        >
          <el-table-column
            prop="uploadTime"
            align="center"
            label="提交时间"
            sortable
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="fid"
            align="center"
            label="职工号"
            sortable
            width="180"
          >
          </el-table-column>
          <el-table-column prop="name" align="center" label="姓名" width="180">
          </el-table-column>
          <el-table-column
            prop="workLoadType"
            align="center"
            label="工作量类型"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="workLoad"
            align="center"
            label="工作量项"
            width="350"
          >
          </el-table-column>
          <el-table-column prop="proof" align="center" label="佐证" width="150">
            <template slot-scope="scope">
              <i
                class="el-icon-document icon-item"
                @click="
                  getProof(
                    scope.row.destination,
                    scope.row.filename,
                    scope.row.originalname
                  )
                "
              ></i>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="sunccess"
                @click="handlePass(scope.row)"
                >通过</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleReject(scope.row)"
                >驳回</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="handleApplyPageChange"
            :total="applySum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="finished" class="tab-pane">
        <el-table
          ref="filterTable"
          :data="finishInfo"
          style="width: 100%"
          class="table"
          max-height="690"
        >
          <el-table-column
            prop="uploadTime"
            align="center"
            label="审核时间"
            sortable
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="fid"
            align="center"
            label="职工号"
            sortable
            width="180"
          >
          </el-table-column>
          <el-table-column prop="name" align="center" label="姓名" width="180">
          </el-table-column>
          <el-table-column
            prop="workLoadType"
            align="center"
            label="工作量类型"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="workLoad"
            align="center"
            label="工作量项"
            width="350"
          >
          </el-table-column>
          <el-table-column prop="proof" align="center" label="佐证" width="150">
            <template slot-scope="scope">
              <i
                class="el-icon-document icon-item"
                @click="
                  getProof(
                    scope.row.destination,
                    scope.row.filename,
                    scope.row.originalname
                  )
                "
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="280"
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
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="handleFinishPageChange"
            :total="finishSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getWorkLoadList, auditWorkLoad } from "@/api/workLoad";
export default {
  created() {
    this.doGetWorkLoadList("apply", 1);
    this.doGetWorkLoadList("finish", 1);
  },
  data() {
    return {
      applySum: 0,
      finishSum: 0,
      activeName: "unfinish",
      isLoading: true,
      applyInfo: [],
      finishInfo: [],
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
    async doAuditWorkLoad(data) {
      let res = await auditWorkLoad(data);
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
    async doGetWorkLoadList(mode, page) {
      let res = await getWorkLoadList(mode, page);
      if (res.success) {
        if (mode === "apply") {
          this.applyInfo = res.data.data;
          this.applySum = res.data.sum;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        } else {
          this.finishInfo = res.data.data;
          this.finishSum = res.data.sum;
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      }
    },
    handleApplyPageChange(page) {
      this.doGetWorkLoadList("apply", page);
    },
    handleFinishPageChange(page) {
      this.doGetWorkLoadList("finished", page);
    },
    filterTag(value, row) {
      return row.power === value;
    },
    getProof(destination, filename, originalname) {
      window.open(
        `api/download_load?destination=${destination}&filename=${filename}&originalname=${originalname}`
      );
    },
    handlePass(row) {
      this.doAuditWorkLoad({
        workLoadTypeId: row.workLoadTypeId,
        storageId: row.storageId,
        modeId: 1,
        fid: row.fid
      }).then(() => {
        this.doGetWorkLoadList("apply", 1);
        this.doGetWorkLoadList("finished", 1);
      });
    },
    handleReject(row) {
      this.doAuditWorkLoad({
        workLoadTypeId: row.workLoadTypeId,
        storageId: row.storageId,
        modeId: 2,
        fid: row.fid
      }).then(() => {
        this.doGetWorkLoadList("apply", 1);
        this.doGetWorkLoadList("finished", 1);
      });
    },
    async handleSearch() {},
    handleBack() {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1540px;
  margin: 0 20px;
  height: 794px; // 与其他分页样式相同
  position: relative;
  .header {
    .input-with-select {
      margin-left: 40px;
      width: 400px;
    }
    .add-btn {
      margin-left: 910px;
    }
  }
  .tab-pane {
    height: 740px;
    .table {
      .icon-item {
        font-size: 24px;
        cursor: pointer;
      }
      .tag {
        padding: 0 20px;
        margin: 0 5px;
      }
    }
    .table-pagination {
      width: 100%;
      position: absolute;
      top: 705px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
