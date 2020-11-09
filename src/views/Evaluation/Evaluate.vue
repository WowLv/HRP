<template>
  <div class="container">
    <el-date-picker
      class="year-item"
      clearable
      align="center"
      v-model="evaluationYear"
      type="year"
      placeholder="选择考核年份"
      @change="handleYearChange"
    >
    </el-date-picker>
    <el-tabs v-model="activeName" v-loading="isLoading">
      <el-tab-pane label="待考核" name="evaluate" class="tab-pane">
        <el-table :data="evaluateData" class="table" max-height="690">
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="teachLoad"
            label="实际教学课时量"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="publicGpa"
            label="公共工作量绩点"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="scientGpa"
            label="教科研工作量绩点"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
            class="form-item"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="medium"
                @click="handleEvaluate(scope.row)"
                >考核</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="evaluateChange"
            :total="evaluateSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已考核" name="finished" class="tab-pane">
        <el-table :data="finishedData" class="table" max-height="690">
          <el-table-column
            prop="fid"
            label="职工号"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="grade"
            label="绩效得分"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="evaluation"
            label="绩效评价"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="考核时间"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
            class="form-item"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="medium"
                @click="handleOpenReEvaluate(scope.row)"
                >再评</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination
            background
            :pageSize="10"
            layout="prev, pager, next, jumper"
            @current-change="finishChange"
            :total="finishedSum"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="绩效再评"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <el-form :model="reEvalInfo" ref="form" :rules="rule">
        <el-form-item label="重设绩效分值" prop="grade">
          <el-input
            type="number"
            v-model="reEvalInfo.grade"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleReEvaluate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGpaRecord,
  getEvaluation,
  evaluate,
  resetGrade
} from "@/api/evaluation";
import { handleMsg } from "@/lib/util";
export default {
  created() {
    setTimeout(() => {
      this.doGetGpaRecord(1, this.formatYear);
      this.doGetEvaluation(1, this.formatYear);
      this.isLoading = false;
    }, 500);
  },
  data() {
    return {
      isLoading: true,
      dialogFormVisible: false,
      activeName: "evaluate",
      evaluationYear: new Date(),
      evaluateData: [],
      finishedData: [],
      evaluateSum: 0,
      finishedSum: 0,
      reEvalInfo: {
        evaluateRecordId: "",
        oldGrade: "",
        grade: ""
      },
      rule: {
        grade: [{ required: true, message: "请输入新分值", trigger: "blur" }]
      }
    };
  },
  computed: {
    formatYear() {
      return new Date(this.evaluationYear).getFullYear();
    }
  },
  methods: {
    async doResetGrade(data) {
      const res = await resetGrade(data);
      handleMsg(res);
      this.doGetEvaluation(1, this.formatYear);
    },
    async doEvaluate(row) {
      const res = await evaluate(row);
      handleMsg(res);
      if (res.success) {
        this.doGetGpaRecord(1, this.formatYear);
        this.doGetEvaluation(1, this.formatYear);
      }
    },
    async doGetEvaluation(page, year) {
      let res = await getEvaluation(page, year),
        { data, sum } = res.data;
      console.log(res);
      this.finishedSum = sum;
      this.finishedData = data;
    },
    async doGetGpaRecord(page, year) {
      let res = await getGpaRecord(page, year),
        { data, sum } = res.data;
      this.evaluateSum = sum;
      this.evaluateData = data;
    },

    evaluateChange(p) {
      this.doGetGpaRecord(p, this.formatYear);
    },
    finishChange(p) {
      this.doGetEvaluation(p, this.formatYear);
    },
    handleYearChange() {
      this.doGetGpaRecord(1, this.formatYear);
      this.doGetEvaluation(1, this.formatYear);
    },
    handleEvaluate(row) {
      this.doEvaluate(row);
    },
    handleOpenReEvaluate(row) {
      this.reEvalInfo.evaluateRecordId = row.evaluateRecordId;
      this.reEvalInfo.oldGrade = row.grade;
      this.dialogFormVisible = true;
    },
    handleReEvaluate() {
      let { oldGrade, grade } = this.reEvalInfo;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else if (Number(oldGrade) === Number(grade)) {
          this.$message({
            message: "与原绩效分值相同",
            type: "warning"
          });
        } else {
          this.$confirm("确认重设绩效分值？")
            .then(() => {
              this.doResetGrade(
                Object.assign(this.reEvalInfo, {
                  grade: Number(grade)
                })
              );
              this.$refs["form"].resetFields();
              this.dialogFormVisible = false;
            })
            .catch(() => {
              return;
            });
        }
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
  .year-item {
    width: 400px;
    // margin-left: 40px;
  }
  .tab-pane {
    height: 740px;
    .table {
      width: 1200px;
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
      top: 665px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
