<template>
  <el-container class="home-container">
    <fd-header />
    <el-container class="home-body">
      <HomeAside />
      <HomeMain />
    </el-container>
  </el-container>
</template>

<script>
import HomeAside from './components/Aside.vue';
import HomeMain from './components/Main.vue';
export default {
  name: 'Home',
  components: {
    HomeAside,
    HomeMain
  }
};
</script>

<style lang="less" scoped>
.home-container {
  overflow: hidden;
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;

  .home-body {
    overflow: hidden;
  }
}
</style>
