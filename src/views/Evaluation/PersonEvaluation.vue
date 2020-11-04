<template>
  <div class="container" v-loading="isLoading">
    <el-form label-width="150px" :model="loadInfo" class="form">
      <el-form-item label="考核时间" class="form-item" prop="createTime">
        <el-date-picker
          type="year"
          style="width: 100%;"
          placeholder="选择日期"
          v-model="evaluateYear"
          @change="handleYearChange"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="职工号" class="form-item" prop="fid">
        <el-input v-model="loadInfo.fid" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input v-model="loadInfo.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="绩效得分" class="form-item" prop="name">
        <el-input v-model="loadInfo.grade" disabled></el-input>
      </el-form-item>
      <el-form-item label="绩效评价" class="form-item" prop="name">
        <el-input v-model="loadInfo.evaluation" disabled></el-input>
      </el-form-item>
      <el-form-item label="考核时间" class="form-item" prop="recordTime">
        <el-input v-model="loadInfo.createTime" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPersonEvaluation } from "@/api/evaluation";
import { mapGetters } from "vuex";
export default {
  created() {
    this.doGetPersonEvaluation(this.uid, this.nowYear);
  },
  data() {
    return {
      isLoading: true,
      evaluateYear: new Date(),
      loadInfo: {
        fid: "",
        name: "",
        grade: "",
        evaluation: "",
        createTime: ""
      }
    };
  },
  computed: {
    ...mapGetters(["uid"]),
    nowYear() {
      return new Date(this.evaluateYear).getFullYear();
    }
  },
  methods: {
    async doGetPersonEvaluation(fid, year) {
      const { data } = await getPersonEvaluation(fid, year);
      setTimeout(() => {
        this.loadInfo = data;
        this.isLoading = false;
      }, 500);
    },
    handleYearChange() {
      this.doGetPersonEvaluation(this.uid, this.nowYear);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 1540px;
  display: flex;
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      .option-item {
        width: 450px;
        @media screen and (max-width: $screenChangeSize) {
          width: 300px;
        }
      }
      .form-btn {
        width: 100px;
        margin-left: 150px;
        margin-top: 30px;
      }
    }
  }
  .table {
    padding: 20px;
  }
}
</style>
