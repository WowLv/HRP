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
        <el-input v-model="loadInfo.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时量" class="form-item" prop="teachLoad">
        <el-input
          v-model="loadInfo.teachLoad"
          type="number"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="操作时间" class="form-item" prop="updateTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="loadInfo.updateTime"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="btn-group form-item" v-if="mode === 'check'">
        <el-button type="primary" class="form-btn" @click="handleCheck"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item class="btn-group form-item" v-else>
        <el-button class="form-btn" @click="handleCancel">取消</el-button>
        <el-button type="success" class="form-btn" @click="handleSubmit"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateUid, validateName, validateCalc } from "@/lib/validate";
import { handleMsg } from "@/lib/util";
import { setTeachLoad } from "@/api/teach";
export default {
  data() {
    return {
      mode: "check",
      loadInfo: {
        name: "",
        teachLoad: "",
        updateTime: ""
      },
      rule: {
        fid: [{ required: true, validator: validateUid, trigger: "blur" }],
        name: [{ required: true, validator: validateName, trigger: "blur" }],
        updateTime: [
          { required: true, validator: validateCalc, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async doSetTeachLoad(data) {
      let res = await setTeachLoad(data);
      console.log(res);
      if (data.mode === "check") {
        this.loadInfo.name = res.data.name;
        this.loadInfo.teachLoad = res.data.teachLoad;
        handleMsg(res);
        this.mode = "update";
      } else if (res.success && data.mode === "update") {
        handleMsg(res);
        this.mode = "check";
        this.$refs["forms"].resetFields();
      }
    },
    handleCheck() {
      this.doSetTeachLoad({ mode: this.mode, fid: this.loadInfo.fid });
    },
    handleCancel() {
      this.mode = "check";
      this.$refs["forms"].resetFields();
    },
    handleSubmit() {
      this.doSetTeachLoad(Object.assign(this.loadInfo, { mode: this.mode }));
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
    .btn-group {
      display: flex;
      justify-content: center;
    }
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
        // margin-left: 150px;
        margin-top: 30px;
      }
    }
  }
  .table {
    padding: 20px;
  }
}
</style>
