<template>
  <div class="container">
    <div class="title">
      <h1>绩效考核系统</h1>
    </div>

    <transition appear>
      <div class="login">
        <section class="login_window">
          <p class="login_header">登录</p>
          <div class="login_body">
            <el-form
              :model="ruleForm"
              class="demo-form-inline"
              :rules="rule"
              ref="ruleForm"
            >
              <el-form-item prop="user" class="form-item">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  v-model="ruleForm.user"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="pw" class="form-item">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="ruleForm.pw"
                  placeholder="请输入密码"
                  show-password
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login_btn"
                  type="primary"
                  style="width:100%"
                  @click="onSubmit"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        user: "",
        pw: ""
      },
      //prop中的键和rule中要一样
      rule: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pw: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    ...mapActions(["setLogin", "clearTab"]),
    valiLogin(msg) {
      this.$message({
        message: msg,
        type: "warning"
      });
    },
    userError(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    },
    userSuccess(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          // axios
          if (!this.isLogin) {
            this.setLogin();
            this.clearTab();
          }
          this.$router.push({ name: "Home" });
          this.userSuccess("欢迎进入系统");
        }
      });
    }
  },
  created() {
    // if (!this.$store.state.isLogin) {
    //   this.valiLogin("请先登录");
    // }
  }
};
</script>

<style lang="scss" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f6fc;
  position: relative;
  .title {
    top: 200px;
    color: $theme-color;
    position: absolute;
  }
  .login {
    background-color: white;
    width: 550px;
    // margin: 0 auto;
    // margin-top: 300px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 60px 50px;
    .login_window {
      display: flex;
      flex-direction: column;
      align-items: center;
      .login_header {
        font-size: 32px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        padding-bottom: 40px;
        color: $theme-color;
      }
      .login_body {
        width: 100%;
        .form-item {
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
