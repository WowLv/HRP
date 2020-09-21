<template>
  <div class="container">
    <el-form
      label-width="150px"
      :model="personInfo"
      class="form"
      ref="forms"
      :rules="rule"
    >
      <el-form-item label="职工号" class="form-item" prop="uid">
        <el-input v-model="personInfo.uid" @input="checkUid"></el-input>
      </el-form-item>
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
      <el-form-item label="手机号码" class="form-item" prop="phone">
        <el-input v-model="personInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item" prop="email">
        <el-input v-model="personInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password" class="form-item">
        <el-input
          type="password"
          v-model="personInfo.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" class="form-item">
        <el-input
          type="password"
          v-model="personInfo.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限" class="form-item" prop="power">
        <el-select
          v-model="personInfo.power"
          placeholder="请选择"
          class="option-item"
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
var timer = null;

import { register } from "@/api/login";
import { getPersonFile } from "@/api/memberFile";
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateName,
  validatePass,
  validateUid
} from "@/lib/validate";
export default {
  data() {
    return {
      personInfo: {},
      rule: {
        uid: [{ required: true, validator: validateUid, trigger: "blur" }],
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        age: [{ required: true, validator: validateAge, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          {
            required: true,
            validator: this.validateCheckPass,
            trigger: "blur"
          }
        ],
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
    checkUid(e) {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.doGetPersonFile(e);
      }, 2000);
    },
    validateCheckPass(rule, value, callback) {
      console.log(rule);
      if (!value || !value.trim()) {
        callback(new Error("请输入密码"));
      } else if (value !== this.personInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    async doGetPersonFile(uid) {
      let res = await getPersonFile(uid);
      if (res.success) {
        console.log(res);
        this.personInfo = Object.assign(res.data, {
          username: res.data.name,
          uid: this.personInfo.uid
        });
      } else {
        this.personInfo = { uid: this.personInfo.uid };
      }
    },
    async doRegister() {
      let res = await register(
        Object.assign(
          {},
          {
            uid: parseInt(this.personInfo.uid),
            username: this.personInfo.username.trim(),
            pwd: this.personInfo.password,
            age: parseInt(this.personInfo.age.trim()),
            sex: this.personInfo.sex,
            phone: this.personInfo.phone.trim(),
            email: this.personInfo.email && this.personInfo.email.trim(),
            power: this.personInfo.power
          }
        )
      );
      if (res.success) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$refs["forms"].resetFields();
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
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
      .option-item {
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
