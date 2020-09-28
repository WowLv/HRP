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
      <el-form-item label="工作量项" class="form-item" prop="publicLoad">
        <el-select
          v-model="loadInfo.publicLoad"
          placeholder="请选择工作量项"
          class="option-item"
        >
          <el-option
            v-for="item in workLoadOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作时间" class="form-item" prop="date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="loadInfo.date"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-upload
        class="upload-item"
        action=""
        ref="upload"
        drag
        multiple
        :http-request="uploadFile"
        name="scientific"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          请上传公共工作量相关佐证
        </div>
      </el-upload>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn" @click="submit"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postScientificLoad } from "@/api/workLoad";
import { validateUid, validateName } from "@/lib/validate";
export default {
  data() {
    return {
      loadInfo: {},
      workLoadOptions: [],
      fileList: [],
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        publicLoad: [
          { required: true, message: "请选择工作量项", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    async uploadFile(fileObj) {
      let res = await postScientificLoad(fileObj);
      console.log(res);
    },
    submit() {
      console.log("submit");
      this.$refs.upload.submit();
    }
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
    .upload-item {
      margin-left: 195px;
    }
  }
  .table {
    padding: 20px;
  }
}
</style>
