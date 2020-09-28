<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="loadInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="职工号" class="form-item" prop="fid">
        <el-input v-model="loadInfo.fid"></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item" prop="name">
        <el-input v-model="loadInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="课时量" class="form-item" prop="teachLoad">
        <el-input v-model="loadInfo.teachLoad" type="number"></el-input>
      </el-form-item>
      <el-form-item label="操作时间" class="form-item" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="loadInfo.date"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateUid, validateName, validateTeachLoad } from "@/lib/validate";
export default {
  data() {
    return {
      loadInfo: {},
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        teachLoad: [
          { required: true, validator: validateTeachLoad, trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      .option-item {
        width: 450px;
        @media screen and (max-width: 1600px) {
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
