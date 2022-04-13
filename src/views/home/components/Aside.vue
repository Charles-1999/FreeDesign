<template>
  <el-aside class="home-aside-wrapper" :width="this.isCollapse ? '6.4rem' : '250px'">
    <el-menu
      class="home-aside-menu"
      :default-active="activeIndex"
      :collapse="isCollapse"
      :router="true">
      <el-menu-item index="/home/template-list">
        <fd-icon name='icon-huiyuan' :size="24" />
        <span class="text" slot="title">精选推荐</span>
      </el-menu-item>
      <el-menu-item index="/home/projectList">
        <fd-icon name='icon-bianji' :size="24" />
        <span class="text" slot="title">工作台</span>
      </el-menu-item>
      <el-menu-item index="/home/my-template">
        <fd-icon name='icon-shoucang' :size="24" />
        <span class="text" slot="title">我的模板</span>
      </el-menu-item>
      <!-- <el-submenu index="/home/template">
        <template slot="title">
          <i class="el-icon-edit-outline menu-icon" />
          <span class="text" slot="title">模板库</span>
        </template>
      </el-submenu> -->
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
      activeIndex: '/'
    };
  },
  mounted() {
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
    border-right: 0;
    background-image: url('../../../assets/images/bg-list.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: bottom;

    ::v-deep .el-menu-item {
      display: flex;
      align-items: center;
      font-size: 15px;

      .iconfont {
        margin-right: 10px;
      }

      &.is-active {
        font-weight: 500;
        background-color: #e6edfb;
      }
    }

    > :first-child {
      margin-top: 10px;
    }
  }
}
</style>
