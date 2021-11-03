<template>
  <el-card class="register-panel-wrapper">
    <h2>请注册</h2>
    <el-form
      class="register-form-container"
      :model="registerForm"
      :rules="formRules"
      ref="registerForm">
      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          show-password />
      </el-form-item>
      <el-form-item prop="cpassword">
        <el-input
          v-model="registerForm.cpassword"
          placeholder="确认密码"
          prefix-icon="el-icon-key"
          show-password />
      </el-form-item>
      <el-form-item>
        <el-button
          class="register-form-btn"
          type="primary">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-button
      type="text"
      @click="changeRegister">
      已有账号？直接登录
    </el-button>
  </el-card>
</template>

<script>
export default {
  name: 'LoginCard',
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        cpassword: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        cpassword: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$router.push('/home');
    },
    changeRegister() {
      this.$emit('setRegister');
    }
  }
};
</script>

<style lang="less" scoped>
.register-panel-wrapper {
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
  .register-form-container {
    > div {
      margin-bottom: 30px;
    }
    .register-form-btn {
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
