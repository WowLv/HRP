<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="personInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="姓名" class="form-item" prop="username">
        <el-input v-model="personInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-item" prop="sex">
        <el-radio v-model="personInfo.sex" label="男" class="sex-item"
          >男</el-radio
        >
        <el-radio v-model="personInfo.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" class="form-item" prop="age">
        <el-input v-model="personInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" type="tel" class="form-item" prop="phone">
        <el-input v-model="personInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item" prop="email">
        <el-input v-model="personInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="权限" class="form-item" prop="power">
        <el-select
          v-model="personInfo.power"
          placeholder="请选择"
          class="power-item"
        >
          <el-option
            v-for="item in powerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" class="form-btn" @click="handleSubmit"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateName
} from "@/lib/validate.js";
export default {
  created() {},
  data() {
    return {
      personInfo: {
        username: "",
        age: "",
        sex: "",
        phone: "",
        email: "",
        power: ""
      },
      rule: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, validator: validateAge, trigger: "change" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        power: [{ required: true, message: "请选择权限", trigger: "change" }]
      },
      powerOptions: [
        {
          value: 1,
          label: "管理员"
        },
        {
          value: 2,
          label: "院长"
        },
        {
          value: 3,
          label: "部门主管"
        },
        {
          value: 4,
          label: "教务员"
        },
        {
          value: 5,
          label: "教师"
        }
      ]
    };
  },
  computed: {},
  methods: {
    doRegister() {
      this.personInfo.username.trim();
      this.personInfo.age.trim();
      console.log(this.personInfo);
      this.$refs["forms"].resetFields();
      this.$message({
        message: "假装注册成功",
        type: "success"
      });
    },
    handleSubmit() {
      this.$refs["forms"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.doRegister();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  .form {
    width: 600px;
    margin-top: 50px;
    .form-item {
      margin-bottom: 20px;
      .sex-item {
        margin: 0 30px;
      }
      .power-item {
        width: 450px;
        @media screen and (max-width: 1600px) {
          width: 300px;
        }
      }
      .form-btn {
        width: 150px;
        margin-left: 120px;
        margin-top: 30px;
      }
    }
  }
}
</style>
