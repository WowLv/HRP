<template>
  <div class="container" v-loading="isLoading">
    <el-form label-width="150px" :model="personInfo" class="form">
      <el-form-item label="职工号" class="form-item">
        <el-input v-model="personInfo.uid" :disabled="disabled.uid"></el-input>
      </el-form-item>
      <el-form-item label="姓名" class="form-item">
        <el-input
          v-model="personInfo.username"
          :disabled="disabled.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-item">
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
      <el-form-item label="年龄" class="form-item">
        <el-input v-model="personInfo.age" :disabled="disabled.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="form-item">
        <el-input
          v-model="personInfo.phone"
          :disabled="disabled.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item">
        <el-input
          v-model="personInfo.email"
          :disabled="disabled.email"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限" class="form-item">
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
  power: false
};
var info_disable = {
  uid: true,
  username: true,
  sex: true,
  age: true,
  phone: true,
  email: true,
  power: true
};
import { getInfo, setInfo } from "@/api/personInfo.js";
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
      personInfo: {
        uid: "",
        username: "",
        sex: "",
        age: "",
        phone: "",
        email: "",
        power: ""
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
    saveInfo() {
      this.Editable = false;
      console.log(this.personInfo);
      this.disabled = info_disable;
      //将个人用户信息对象调整后上传
      setInfo(
        Object.assign(this.personInfo, {
          age: parseInt(this.personInfo.age)
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
      .sex-item {
        margin: 0 30px;
      }
      .power-item {
        width: 450px;
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
