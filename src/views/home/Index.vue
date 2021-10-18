<template>
  <el-container class="home-container">
    <PageHeader />
    <el-container class="home-body">
      <HomeAside />
      <HomeMain />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import HomeAside from './components/Aside.vue';
import HomeMain from './components/Main.vue';
export default {
  name: 'Home',
  components: {
    PageHeader,
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
