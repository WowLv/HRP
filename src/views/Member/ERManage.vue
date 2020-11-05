<template>
  <div class="container">
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="未审批" name="unfinish" class="tab-pane">
        <el-table
          :data="applyData"
          class="table"
          max-height="690"
          ref="applyTable"
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
            width="200"
          ></el-table-column>
          <el-table-column
            prop="fid"
            label="负责人职工号"
            align="center"
            width="170"
          ></el-table-column>
          <el-table-column
            prop="applicant"
            label="申请人"
            align="center"
            width="170"
          ></el-table-column>
          <el-table-column label="申请描述" align="center" width="250">
            <template slot-scope="scope">
              <el-button @click="handleApplyExpand(scope.row)"
                >点击查看</el-button
              >
            </template>
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
                :type="scope.row.applyTypeId === 1 ? 'primary' : 'warning'"
                disable-transitions
                class="tag"
                >{{ scope.row.applyType }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
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
      <el-tab-pane label="已审批" name="finished" class="tab-pane">
        <el-table
          :data="finishedData"
          ref="finishTable"
          class="table"
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
            label="审核时间"
            width="180"
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
          <el-table-column label="申请描述" align="center" width="220">
            <template slot-scope="scope">
              <el-button @click="handleFinishExpand(scope.row)"
                >点击查看</el-button
              >
            </template>
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
            width="175"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.applyTypeId === 1 ? 'primary' : 'warning'"
                disable-transitions
                class="tag"
                >{{ scope.row.applyType }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="175"
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
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="8"
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
  getAllMenberApply,
  getAllMenberFinished,
  auditMember,
  delMemberRecord
} from "@/api/memberFile";
export default {
  created() {
    this.doGetAllMenberApply(this.applyCurrPage);
    this.doGetAllMenberFinished(this.finishCurrPage);
  },
  data() {
    return {
      isLoading: true,
      activeName: "unfinish",
      applyData: [],
      finishedData: [],
      applySum: 0,
      finishSum: 0,
      applyCurrPage: 1,
      finishCurrPage: 1,
      tagType: {
        1: "warning",
        2: "warning",
        3: "success",
        4: "primary"
      }
    };
  },
  methods: {
    async doDelMemberRecord(mid) {
      let res = await delMemberRecord(mid);
      handleMsg(res);
    },
    async doGetAllMenberApply(page) {
      this.applyData = [];
      let res = await getAllMenberApply(page);
      if (res.success) {
        this.applyData = res.data.data;
        this.applySum = res.data.sum;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    async doGetAllMenberFinished(page) {
      this.finishedData = [];
      let res = await getAllMenberFinished(page);
      if (res.success) {
        this.finishedData = res.data.data;
        this.finishSum = res.data.sum;
      }
    },
    applyPageChange(p) {
      this.applyCurrPage = p;
      this.doGetAllMenberApply(p);
    },
    finishPageChange(p) {
      this.finishCurrPage = p;
      this.doGetAllMenberFinished(p);
    },
    async handldPass(row) {
      let res = await auditMember(row.mid, 1, row.positionId);
      handleMsg(res);
      this.doGetAllMenberApply(this.applyCurrPage);
      this.doGetAllMenberFinished(this.finishCurrPage);
    },
    async handleReject(row) {
      console.log(row);
      let res = await auditMember(row.mid, 2, row.positionId);
      handleMsg(res);
      this.doGetAllMenberApply(this.applyCurrPage);
      this.doGetAllMenberFinished(this.finishCurrPage);
    },
    handleApplyExpand(row) {
      this.$refs["applyTable"].toggleRowExpansion(row);
    },
    handleFinishExpand(row) {
      this.$refs["finishTable"].toggleRowExpansion(row);
    },
    handleDelete(mid) {
      this.$confirm("确认删除此记录？")
        .then(() => {
          this.doDelMemberRecord(mid).then(() => {
            this.doGetAllMenberFinished(1);
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
      .tag {
        padding: 0 20px;
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
