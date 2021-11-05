<template>
  <div class="login-container">
    <header class="login-logo">
      <img src="../../assets/logo.png" />
      <span>FreeDesign</span>
    </header>
    <main class="login-main">
      <LoginCard v-if="isRegister" @setRegister="setRegister" />
      <RegisterCard v-else @setRegister="setRegister" />
    </main>
  </div>
</template>

<script>
import LoginCard from './components/LoginCard.vue';
import RegisterCard from './components/RegisterCard.vue';
export default {
  components: {
    LoginCard,
    RegisterCard
  },
  name: 'Login',
  data() {
    return {
      isRegister: true
    };
  },
  methods: {
    setRegister() {
      this.isRegister = !this.isRegister;
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: 100% center #f0f2f5 no-repeat
    url(../../assets/login/bg.svg);
  .login-logo {
    height: 4.8rem;
    line-height: 4.8rem;
    box-sizing: border-box;
    padding: 12rem 0 5rem;
    width: 100%;
    margin-bottom: 52px;
    text-align: center;
    img {
      height: 48px;
      margin-right: 16px;
      vertical-align: top;
    }
    span {
      position: relative;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 36px;
      font-family: "Noto Serif SC", "Source Han Serif SC", "Source Han Serif",
        source-han-serif-sc, "PT Serif", "SongTi SC", "MicroSoft Yahei", Georgia,
        serif;
    }
  }
  .login-main {
    margin: 0 auto 80px;
  }
}
</style>
