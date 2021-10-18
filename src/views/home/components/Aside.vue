<template>
  <el-aside class="home-aside-wrapper" :width="this.isCollapse ? '6.4rem' : '20rem'">
    <el-menu
      class="home-aside-menu"
      :default-active="activeIndex"
      :collapse="isCollapse"
      :router="true">
      <el-menu-item v-for="item of menuList" :key="item.title" :index="item.to">
        <i :class="[item.icon, 'menu-icon']" />
        <span class="text" slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'HomeAside',
  data() {
    return {
      screenWidth: document.body.clientWidth,
      isCollapse: false,
      activeIndex: '/',
      menuList: [
        {
          icon: 'el-icon-document',
          title: '我的H5',
          to: '/home'
        },
        {
          icon: 'el-icon-edit-outline',
          title: '模板库',
          to: '/home/template-list'
        }
      ]
    };
  },
  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        _that.screenWidth = window.screenWidth;
      })();
    };
    this.activeIndex = this.$route.path;
  },
  watch: {
    screenWidth(val) {
      let timer = false;
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        setTimeout(() => {
          // 打印screenWidth变化的值
          console.log(this.screenWidth);
          if (this.screenWidth < 1200) {
            this.isCollapse = true;
          } else {
            this.isCollapse = false;
          }
          timer = false;
        }, 400);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-aside-wrapper {
  .home-aside-menu {
    height: 100%;
    text-align: left;
    > :first-child {
      margin-top: 0.8rem;
    }
    .menu-icon {
      font-size: 16px;
    }
    span {
      font-size: 16px;
    }
  }
}
</style>
