<template>
  <el-header class="page-header-wrapper" height="6rem">
    <!-- 头部左边logo -->
    <div class="page-header-left">
      <router-link to="/home">
        <div class="page-header-logo">
          <div class="page-header-logo-txt">FreeDesign</div>
          <!-- <img src="../../assets/logo.png" alt="logo" /> -->
        </div>
      </router-link>
    </div>
    <!-- 头部中间插槽 -->
    <slot name="page-header-middle" />
    <!-- 头部右边用户头像或者名称 -->
    <div class="page-header-right">
      <el-dropdown placement="bottom">
        <el-button type="text" :style="{ fontSize: '16px' }">
          Hi, {{ $store.state.auth.user.nickname }}
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          class="page-header-dropdown">
          <el-dropdown-item>
            <el-button type="text">
              个人设置
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button
              type="text"
              @click="handleLogout">
              登出
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { ACCOUNT } from '@apis/login';
export default {
  name: 'FdHeader',

  data() {
    return {
      auth: 'user'
    };
  },

  methods: {
    async handleLogout() {
      await this.$http.post(ACCOUNT.LOGOUT);
      this.$router.push('/');
    }
  }
};
</script>

<style lang="less" scoped>
.page-header-wrapper {
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  .page-header-left {
    display: flex;
    align-items: center;
    .page-header-logo {
      // line-height: 4rem;
      // width: 3.6rem;
      // img {
      //   display: inline-block;
      //   height: 3.6rem;
      //   vertical-align: middle;
      //   cursor: pointer;
      // }
      .page-header-logo-txt {
        color: @primary-color;
        font-size: 2.4rem;
        font-family: "Noto Serif SC", "Source Han Serif SC", "Source Han Serif",
          source-han-serif-sc, "PT Serif", "SongTi SC", "MicroSoft Yahei",
          Georgia, serif;
      }
    }
  }
}
.page-header-dropdown {
  text-align: center;
}
</style>
