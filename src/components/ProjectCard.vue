<template>
  <div class="pcard-item-wrapper" @click="go">
    <el-card class="pcard-item-container" shadow='hover' :body-style="{padding: 0}">
      <i class="el-icon-circle-plus-outline" :style="{fontSize: '100px', fontWeight: '100'}" v-if="id === undefined" />
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
    id: {
      type: Number,
      required: false,
      default: undefined
    },
    mode: {
      type: Number,
      required: true
    }
  },
  methods: {
    go() {
      this.$router.push({
        name: 'Editor',
        query: {
          id: this.id,
          page_mode: this.mode
        }
      });
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
