<template>
  <div class="container">
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="未审批" name="unfinish">
        <el-table :data="applyData" class="table" ref="table">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="申请描述：">
                  <span class="expand-content">{{ scope.row.reason }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyTime"
            label="申请时间"
            align="center"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="transferTypeName"
            label="变动类型"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                color="#e5f2ff"
                disable-transitions
                class="tag"
                v-if="scope.row.transferTypeId === 2"
                >{{ scope.row.transferTypeName }}</el-tag
              >
              <el-tag type="warning" disable-transitions class="tag" v-else>{{
                scope.row.transferTypeName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="变动内容" width="340" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.transferTypeId === 1">
                <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                  scope.row.oldPositionName
                }}</el-tag>
                <i class="_icon el-icon-caret-right"></i>
                <el-tag type="success" disable-transitions class="tag">{{
                  scope.row.positionName
                }}</el-tag>
              </div>
              <div v-if="scope.row.transferTypeId === 2">
                <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                  scope.row.oldStationName
                }}</el-tag>
                <i class="_icon el-icon-caret-right"></i>
                <el-tag type="success" disable-transitions class="tag">{{
                  scope.row.stationName
                }}</el-tag>
                <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                  scope.row.oldLevelName
                }}</el-tag>
                <i class="_icon el-icon-caret-right"></i>
                <el-tag type="success" disable-transitions class="tag">{{
                  scope.row.levelName
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请描述" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="info" @click="handleExpand(scope.row)"
                >点击查看</el-button
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
                @click="handldPass(scope.row)"
                >通过</el-button
              >
              <el-button
                type="danger"
                class="form-btn"
                @click="handleReject(scope.row)"
                >驳回</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="8"
            layout="prev, pager, next, jumper"
            @current-change="applyPageChange"
            :total="applySum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="finished">
        <el-table :data="finishedData" class="table">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="申请描述：">
                  <span class="expand-content">{{ scope.row.reason }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="审批时间"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="transferTypeName"
            label="变动类型"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                color="#e5f2ff"
                disable-transitions
                class="tag"
                v-if="scope.row.transferTypeId === 2"
                >{{ scope.row.transferTypeName }}</el-tag
              >
              <el-tag type="warning" disable-transitions class="tag" v-else>{{
                scope.row.transferTypeName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="变动内容" width="340" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.transferTypeId === 1">
                <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                  scope.row.oldPositionName
                }}</el-tag>
                <i class="_icon el-icon-caret-right"></i>
                <el-tag type="success" disable-transitions class="tag">{{
                  scope.row.positionName
                }}</el-tag>
              </div>
              <div v-if="scope.row.transferTypeId === 2">
                <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                  scope.row.oldStationName
                }}</el-tag>
                <i class="_icon el-icon-caret-right"></i>
                <el-tag type="success" disable-transitions class="tag">{{
                  scope.row.stationName
                }}</el-tag>
                <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                  scope.row.oldLevelName
                }}</el-tag>
                <i class="_icon el-icon-caret-right"></i>
                <el-tag type="success" disable-transitions class="tag">{{
                  scope.row.levelName
                }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请描述" align="center" width="200">
            <template slot-scope="scope">
              <el-button type="info" @click="handleExpand(scope.row)"
                >点击查看</el-button
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
            width="160"
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
import { positionList } from "@/api/memberFile";
import { getPosTransferApply, auditStationTransferApply } from "@/api/station";
export default {
  created() {
    this.doPositionList();
    this.doGetPosTransferApply();
  },
  data() {
    return {
      applySum: 0,
      finishSum: 0,
      isLoading: true,
      activeName: "unfinish",
      applyData: [],
      finishedData: [],
      positionEnum: [],
      levelEnum: [],
      stationEnum: [],
      tagType: {
        1: "success",
        2: "primary"
      }
    };
  },
  methods: {
    async doAuditStationTransferApply(transferId, modeId) {
      let res = await auditStationTransferApply({ transferId, modeId });
      if (res.success) {
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
    async doPositionList() {
      let res = await positionList();
      if (res.success) {
        this.positionEnum = res.data.positionRow;
        this.levelEnum = res.data.levelRow;
        this.stationEnum = res.data.stationRow;
      }
    },
    async doGetPosTransferApply() {
      let res = await getPosTransferApply();
      if (res.success) {
        setTimeout(() => {
          this.applyData = res.data.data;
          this.applySum = res.data.sum;
          this.isLoading = false;
        }, 500);
      }
    },
    applyPageChange(page) {
      console.log(page);
    },
    handleExpand(row) {
      this.$refs["table"].toggleRowExpansion(row);
    },
    handldPass(row) {
      this.doAuditStationTransferApply(row.transferId, 1);
    },
    handleReject(row) {
      this.doAuditStationTransferApply(row.transferId, 2);
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
    height: 720px;
    .table-expand {
      width: 500px;
    }
    .tag {
      padding: 0 20px;
      margin: 0 5px;
    }
    ._icon {
      font-size: 20px;
      margin: 5px 10px;
    }
  }
  .table-pagination {
    width: 100%;
    position: absolute;
    top: 660px;
    display: flex;
    justify-content: center;
  }
}
</style>
