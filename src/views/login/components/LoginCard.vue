<template>
  <el-card class="login-panel-wrapper">
    <h2>请登录</h2>
    <el-form
      class="login-form-container"
      :model="loginForm"
      :rules="formRules"
      :validate-on-rule-change="false"
      ref="loginForm">
      <el-form-item prop="email">
        <el-input
          v-model="loginForm.email"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          show-password />
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-form-btn"
          type="primary"
          :loading="loading"
          @click="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-button
      type="text"
      @click="changeRegister">
      没有账号？去注册
    </el-button>
  </el-card>
</template>

<script>
export default {
  name: 'LoginCard',
  data() {
    return {
      loading: false,
      loginForm: {
        email: '',
        password: ''
      },
      formRules: {
        email: [
          { required: true, message: '请输入邮箱' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ]
      }
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      // const res = await this.$http.post(ACCOUNT.LOGIN, this.loginForm);
      this.$store.dispatch('login', this.loginForm);
      // this.$http.
      this.loading = false;
      this.$router.push('/home');
    },
    changeRegister() {
      this.$emit('setRegister');
    }
  }
};
</script>

<style lang="less" scoped>
.login-panel-wrapper {
  width: 40rem;
  min-height: 36rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  h2 {
    margin-top: 0;
    margin-bottom: 3.2rem;
    font-size: 2.4rem;
    font-weight: 500;
    color: rgb(94, 108, 132);
  }
  .login-form-container {
    > div {
      margin-bottom: 30px;
    }
    .login-form-btn {
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
