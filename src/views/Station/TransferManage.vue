<template>
  <div class="container">
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="未审批" name="unfinish" class="tab-pane">
        <el-table
          :data="applyData"
          class="table"
          ref="applyTable"
          max-height="690"
        >
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
            sortable
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
                <div class="tag-row">
                  <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                    scope.row.oldStationName || "未分配"
                  }}</el-tag>
                  <i class="_icon el-icon-caret-right"></i>
                  <el-tag type="success" disable-transitions class="tag">{{
                    scope.row.stationName
                  }}</el-tag>
                </div>
                <div class="tag-row">
                  <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                    scope.row.oldLevelName || "未分配"
                  }}</el-tag>
                  <i class="_icon el-icon-caret-right"></i>
                  <el-tag type="success" disable-transitions class="tag">{{
                    scope.row.levelName
                  }}</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请描述" align="center" width="200">
            <template slot-scope="scope">
              <el-button @click="handleApplyExpand(scope.row)"
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
                @click="handldReject(scope.row)"
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
            @current-change="applyPageChange"
            :total="applySum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="finished" class="tab-pane">
        <el-table
          :data="finishData"
          class="table"
          ref="finishTable"
          max-height="690"
        >
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
            sortable
            align="center"
            width="160"
          ></el-table-column>
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="transferTypeName"
            label="变动类型"
            width="150"
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
                <div class="tag-row">
                  <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                    scope.row.oldStationName || "未分配"
                  }}</el-tag>
                  <i class="_icon el-icon-caret-right"></i>
                  <el-tag type="success" disable-transitions class="tag">{{
                    scope.row.stationName
                  }}</el-tag>
                </div>
                <div class="tag-row">
                  <el-tag color="#e5f2ff" disable-transitions class="tag">{{
                    scope.row.oldLevelName || "未分配"
                  }}</el-tag>
                  <i class="_icon el-icon-caret-right"></i>
                  <el-tag type="success" disable-transitions class="tag">{{
                    scope.row.levelName
                  }}</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="申请描述" align="center" width="200">
            <template slot-scope="scope">
              <el-button @click="handleFinishExpand(scope.row)"
                >点击查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150"
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
            width="150"
            align="center"
            class="form-item"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                @click="handleDelete(scope.row.transferId)"
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
            @current-change="finishPageChange"
            :total="finishSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { handleMsg } from "@/lib/util";
import {
  getPosTransferApply,
  auditPosTransferApply,
  deleteTransferRecord
} from "@/api/station";
export default {
  created() {
    this.doGetPosTransferApply(1);
    this.doGetPosTransferFinish(1);
  },
  data() {
    return {
      applySum: 0,
      finishSum: 0,
      isLoading: true,
      activeName: "unfinish",
      applyData: [],
      finishData: [],
      tagType: {
        1: "success",
        2: "primary"
      }
    };
  },
  methods: {
    async doDeleteTransferRecord(transferTypeId) {
      const res = await deleteTransferRecord(transferTypeId);
      handleMsg(res);
    },
    async doAuditPosTransferApply(data) {
      let res = await auditPosTransferApply(data);
      handleMsg(res);
    },
    async doGetPosTransferFinish(page) {
      let res = await getPosTransferApply({ mode: "finished", page });
      this.finishData = res.data.data;
      this.finishSum = res.data.sum;
      if (res.success) {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    async doGetPosTransferApply(page) {
      let res = await getPosTransferApply({ mode: "apply", page });
      if (res.success) {
        this.applyData = res.data.data;
        this.applySum = res.data.sum;
        this.isLoading = false;
      }
    },
    applyPageChange(page) {
      this.doGetPosTransferApply(page);
    },
    finishPageChange(page) {
      this.doGetPosTransferFinish(page);
    },
    handleApplyExpand(row) {
      this.$refs["applyTable"].toggleRowExpansion(row);
    },
    handleFinishExpand(row) {
      this.$refs["finishTable"].toggleRowExpansion(row);
    },
    handldPass(row) {
      this.doAuditPosTransferApply({ ...row, modeId: 1 }).then(() => {
        this.doGetPosTransferFinish(1);
        this.doGetPosTransferApply(1);
      });
    },
    handldReject(row) {
      this.doAuditPosTransferApply({ ...row, modeId: 2 }).then(() => {
        this.doGetPosTransferFinish(1);
        this.doGetPosTransferApply(1);
      });
    },
    handleDelete(transferId) {
      this.$confirm("确认删除此记录？")
        .then(() => {
          this.doDeleteTransferRecord(transferId).then(() => {
            this.doGetPosTransferFinish(1);
          });
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 1500px;
  margin: 0 20px;
  position: relative;
  .tab-pane {
    height: 740px;
    .table {
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
      top: 705px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
