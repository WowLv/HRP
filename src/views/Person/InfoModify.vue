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
        prop="pwd"
        class="form-item"
        v-if="mode === 'admin'"
      >
        <el-input
          prefix-icon="el-icon-lock"
          v-model="personInfo.pwd"
          placeholder="请输入新密码"
          :disabled="disabled.pwd"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="权限" class="form-item" prop="powerId">
        <el-select
          v-model="personInfo.powerId"
          placeholder="请选择"
          :disabled="disabled.powerId"
          class="power-item"
        >
          <el-option
            v-for="item in powerOptions"
            :key="item.value"
            :label="item.text"
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
  pwd: false,
  powerId: false
};
var info_disable = {
  uid: true,
  username: true,
  sex: true,
  age: true,
  phone: true,
  email: true,
  pwd: true,
  powerId: true
};
import { getInfo, setInfo } from "@/api/personInfo";
import { positionList } from "@/api/memberFile";
import { handleMsg } from "@/lib/util";
import {
  validatePhone,
  validateEmail,
  validateAge,
  validateName
} from "@/lib/validate";
import { Teacher, Admin } from "@/lib/class";
import { mapGetters } from "vuex";
export default {
  created() {
    this.doPositionList();
    if (this.$route.params.mode) {
      this.mode = this.$route.params.mode;
      let {
        uid,
        username,
        sex,
        age,
        phone,
        email,
        powerId
      } = this.$route.params.userObj;
      this.personInfo = new Admin(
        uid,
        username,
        sex,
        age,
        phone,
        email,
        powerId
      );
      this.disabled = info_disable;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    } else {
      this.doGetInfo(this.uid);
    }
  },
  data() {
    return {
      powerOptions: [],
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
        powerId: [{ required: true, message: "请选择权限", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters(["power", "uid"])
  },
  methods: {
    async doPositionList() {
      const res = await positionList();
      this.powerOptions = res.data.powerRow;
    },
    async doGetInfo(Uid) {
      let res = await getInfo(Uid);
      // console.log(res.data);
      let { uid, username, sex, age, phone, email, powerId } = res.data;
      if (res.success) {
        this.personInfo = new Teacher(
          uid,
          username,
          sex,
          age,
          phone,
          email,
          powerId
        );
        this.disabled = info_disable;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    },
    editInfo() {
      this.Editable = true;
      //管理员与其他用户界面区别
      if (this.power === 1) {
        this.disabled = Object.assign(info_able, { uid: true });
      } else {
        this.disabled = Object.assign(info_able, { uid: true, powerId: true });
      }
    },
    //当权限为管理员时可在此强制改密码,不输入则不改
    async saveInfo() {
      this.Editable = false;
      this.disabled = info_disable;
      let personInfo = this.personInfo;
      if (!personInfo.pwd || !personInfo.pwd.trim()) {
        delete personInfo.pwd;
        // console.log("no password");
      }
      //将个人用户信息对象调整后上传
      let res = await setInfo(
        Object.assign(personInfo, {
          age: parseInt(`${personInfo.age}`.trim()),
          username: personInfo.username.trim()
        })
      );
      handleMsg(res);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 1540px;
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
