<template>
  <div class="pcard-item-wrapper" @click="go">
    <el-card class="pcard-item-container" shadow='hover' :body-style="{padding: 0}">
      <i class="el-icon-circle-plus-outline" :style="{fontSize: '100px', fontWeight: '100'}" v-if="id === undefined" />
      <el-image
        v-else
        fit="cover"
        :src="imgUrl
        || 'https://cjztest-1302847834.cos.ap-nanjing.myqcloud.com/logos/v2-7f567cba4f40593f5bf288155a15aec7_720w.jpeg'"
        alt="cover" />
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
      default: ''
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 240px;
    padding: 20px;
    box-sizing: border-box;

    ::v-deep.el-image {
      width: 100%;
    }
  }
}
</style>
