<template>
  <div class="pcard-item-wrapper" @click="go">
    <el-card class="pcard-item-container" shadow='hover' :body-style="{padding: 0}">
      <i class="el-icon-circle-plus-outline" :style="{fontSize: '100px', fontWeight: '100'}" v-if="type === 'create'" />
      <img v-else :src="imgUrl" alt="cover" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    imgUrl: {
      type: String,
      required: false,
      default: require('../assets/logo.png')
    },
    type: {
      type: String,
      require: false,
      default: 'edit'
    }
  },
  methods: {
    go() {
      this.$router.push('/editor');
    }
  }
};
</script>

<style lang="less" scoped>
.pcard-item-wrapper {
  margin: 2rem 1.5rem;
  cursor: pointer;
  .pcard-item-container {
    width: 160px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
