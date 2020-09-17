<template>
  <div class="conatiner">
    <el-form ref="form" :model="applyForm" label-width="80px" class="form">
      <el-form-item label="职工号" class="form-item">
        <el-input v-model="applyForm.fid"></el-input>
      </el-form-item>
      <el-form-item label="申请人" class="form-item">
        <el-input v-model="applyForm.name"></el-input>
      </el-form-item>
      <el-form-item label="申请时间" class="form-item">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="applyForm.applyTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="申请原因" class="form-item">
        <el-input type="textarea" v-model="applyForm.reason"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyForm: {
        fid: "",
        name: "",
        applyTime: "",
        reason: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      margin-left: 50px;
      .form-btn {
        width: 150px;
        height: 40px;
        margin-left: 150px;
      }
    }
  }
}
</style>
