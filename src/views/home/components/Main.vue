<template>
  <el-main class="home-main-wrapper">
    <router-view />
  </el-main>
</template>

<script>
export default {
  name: 'HomeMain'
};
</script>

<style lang="less" scoped>
.home-main-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f7f7f7;
}
</style>
