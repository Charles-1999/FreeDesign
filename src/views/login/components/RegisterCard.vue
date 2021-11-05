<template>
  <el-card class="register-panel-wrapper">
    <h2>请注册</h2>
    <el-form
      class="register-form-container"
      :model="registerForm"
      :rules="formRules"
      ref="registerForm">
      <el-form-item prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input
          v-model="registerForm.nickname"
          placeholder="请输入昵称"
          prefix-icon="el-icon-house" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          auto-complete="new-password"
          show-password />
      </el-form-item>
      <el-form-item prop="cpassword">
        <el-input
          v-model="registerForm.cpassword"
          placeholder="确认密码"
          prefix-icon="el-icon-key"
          show-password />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="registerForm.code"
          placeholder="验证码"
          prefix-icon="el-icon-warning-outline">
          <el-button
            class="register-code-btn"
            type="primary"
            slot="suffix"
            size="small"
            :disabled="codeTime !== 0"
            @click="sendCode">
           <span v-if="!codeTime">发送验证码</span>
           <span v-else>{{codeTime}}秒后重发</span>
            </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="register-form-btn"
          type="primary"
          @click="handleRegister">
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
import { ACCOUNT } from '@apis/index.js';
export default {
  name: 'RegisterCard',
  data() {
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (value.match(/^\w+@\w+\.\w+$/i)) {
        callback();
      } else {
        callback(new Error('邮箱格式错误'));
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      codeTime: 0,
      asyncCode: '',
      registerForm: {
        email: '',
        nickname: '',
        password: '',
        cpassword: '',
        code: ''
      },
      formRules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        cpassword: [{ validator: checkPassword, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      }
    };
  },
  methods: {
    sendCode() {
      this.$refs.registerForm.validateField('email', async (errorMessage) => {
        if (errorMessage) return;
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.codeTime = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.codeTime > 0 && this.codeTime <= TIME_COUNT) {
              this.codeTime--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        const res = await this.$http.get(ACCOUNT.CODE, {
          params: {
            email: this.registerForm.email
          }
        });
        this.asyncCode = res.code;
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (!valid) return false;
        const { email, nickname, password, code } = this.registerForm;
        const res = await this.$http.post(ACCOUNT.REGISTER, {
          email,
          nickname,
          password,
          code
        });
        console.log(res);
        // TODO 邮箱已存在，验证码错误等提示
        this.$router.push('/home');
      });
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
    .register-code-btn {
      width: 92px;
    }
    .register-form-btn {
      width: 100%;
      font-size: 18px;
    }
  }
}
</style>
