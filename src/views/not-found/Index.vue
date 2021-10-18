<template>
  <div>
    <el-empty
      class="not-found"
      description=" "
      :image-size="pageHeight">
      <h1>404 Not Found</h1>
    </el-empty>
    <el-button
      type="warning"
      plain
      @click="handleClick">
      返回上一页
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      pageHeight: 0
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.pageHeight = document.body.clientHeight / 2;
  }
};
</script>

<style lang="less" scoped>
.not-found p {
  font-size: 10rem;
}
</style>
