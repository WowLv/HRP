<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rule"
      ref="passForm"
      label-width="100px"
      class="rule-form"
    >
      <el-form-item label="旧密码" prop="oldpass" class="form-item">
        <el-input
          type="password"
          v-model="ruleForm.oldpass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass" class="form-item">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" class="form-item">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { modifyPw } from "@/api/login.js";
export default {
  data() {
    return {
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: ""
      },
      rule: {
        oldpass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        pass: [
          { required: true, validator: this.validatePw1, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: this.validatePw2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    validatePw1(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.ruleForm.oldpass) {
        callback(new Error("与原密码相同"));
      } else {
        callback();
      }
    },
    validatePw2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value === this.ruleForm.oldpass) {
        callback(new Error("与原密码相同"));
      } else {
        callback();
      }
    },
    submitForm() {
      this.$refs["passForm"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          modifyPw(this.ruleForm.oldpass, this.ruleForm.pass).then(res => {
            console.log(res);
            if (!res.success) {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.$refs["passForm"].resetFields();
            } else {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.$router.push({ name: "Home" });
            }
          });
          console.log("submit!!");
        }
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  .rule-form {
    width: 600px;
    margin-top: 50px;
    margin-left: 50px;
    .form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
