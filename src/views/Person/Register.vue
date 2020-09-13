<template>
  <div class="container">
    <el-form label-width="150px" :model="personInfo" class="form">
      <el-form-item label="姓名" class="form-item">
        <el-input v-model="personInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="性别" class="form-item">
        <el-radio v-model="personInfo.sex" label="男" class="sex-item"
          >男</el-radio
        >
        <el-radio v-model="personInfo.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" class="form-item">
        <el-input v-model="personInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="form-item">
        <el-input v-model="personInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item">
        <el-input v-model="personInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="权限" class="form-item">
        <el-input v-model="personInfo.power"></el-input>
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
      }
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      console.log("submit");
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
      .form-btn {
        width: 150px;
        margin-left: 120px;
        margin-top: 30px;
      }
    }
  }
}
</style>
