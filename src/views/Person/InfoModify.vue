<template>
  <div class="container" v-loading="isLoading">
    <el-form label-width="150px" :model="personInfo" class="form" :rules="rule">
      <el-form-item label="职工号" class="form-item">
        <el-input v-model="personInfo.uid" :disabled="disabled.uid"></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item" prop="username">
        <el-input
          v-model="personInfo.username"
          :disabled="disabled.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-item" prop="sex">
        <el-radio
          v-model="personInfo.sex"
          label="男"
          class="sex-item"
          :disabled="disabled.sex"
          >男</el-radio
        >
        <el-radio v-model="personInfo.sex" label="女" :disabled="disabled.sex"
          >女</el-radio
        >
      </el-form-item>
      <el-form-item label="年龄" class="form-item" prop="age">
        <el-input v-model="personInfo.age" :disabled="disabled.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="form-item" prop="phone">
        <el-input
          v-model="personInfo.phone"
          :disabled="disabled.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item" prop="email">
        <el-input
          v-model="personInfo.email"
          :disabled="disabled.email"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        class="form-item"
        v-if="mode === 'admin'"
      >
        <el-input
          prefix-icon="el-icon-lock"
          v-model="personInfo.password"
          placeholder="请输入新密码"
          :disabled="disabled.password"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="权限" class="form-item" prop="power">
        <el-select
          v-model="personInfo.power"
          placeholder="请选择"
          :disabled="disabled.power"
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
        <el-button
          type="danger"
          class="form-btn"
          :disabled="Editable"
          @click="editInfo"
          >修改</el-button
        >
        <el-button
          type="primary"
          class="form-btn"
          :disabled="!Editable"
          @click="saveInfo"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var info_able = {
  uid: false,
  username: false,
  sex: false,
  age: false,
  phone: false,
  email: false,
  password: false,
  power: false
};
var info_disable = {
  uid: true,
  username: true,
  sex: true,
  age: true,
  phone: true,
  email: true,
  password: true,
  power: true
};
import { getInfo, setInfo } from "@/api/personInfo.js";
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateName
} from "@/lib/validate.js";
import { mapGetters } from "vuex";
export default {
  created() {
    if (this.$route.params.mode) {
      this.mode = this.$route.params.mode;
      this.personInfo = this.$route.params.userObj;
      this.disabled = info_disable;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    } else {
      getInfo()
        .then(res => {
          this.personInfo = res.data;
          this.disabled = info_disable;
        })
        .then(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  data() {
    return {
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
      ],
      mode: "",
      disabled: {},
      Editable: false,
      isLoading: true,
      personInfo: {},
      rule: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        age: [{ required: true, validator: validateAge, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        power: [{ required: true, message: "请选择权限", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters(["power"])
  },
  methods: {
    editInfo() {
      this.Editable = true;
      if (this.power === 1) {
        this.disabled = Object.assign(info_able, { uid: true });
      } else {
        this.disabled = Object.assign(info_able, { uid: true, power: true });
      }
    },
    //当权限为管理员时可在此强制改密码,不输入则不改
    saveInfo() {
      this.Editable = false;
      this.disabled = info_disable;
      let personInfo = this.personInfo;
      console.log(personInfo);
      if (!personInfo.password || !personInfo.password.trim()) {
        delete personInfo.password;
      }
      //将个人用户信息对象调整后上传
      setInfo(
        Object.assign(personInfo, {
          age: parseInt(personInfo.age).trim(),
          username: personInfo.username.trim()
        })
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          throw err;
        });
      this.$message({
        message: "保存成功",
        type: "success"
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
      .power-item {
        width: 450px;
        @media screen and (max-width: 1600px) {
          width: 300px;
        }
      }
      .sex-item {
        margin: 0 30px;
      }
      .form-btn {
        width: 100px;
        margin-left: 70px;
        margin-top: 30px;
      }
    }
  }
}
</style>
