<template>
  <div class="pcard-item-wrapper" @click="go">
    <el-card class="pcard-item-container" shadow='hover' :body-style="{padding: 0}">
      <i class="el-icon-circle-plus-outline" :style="{fontSize: '100px', fontWeight: '100'}" v-if="id === undefined" />
      <img v-else :src="imgUrl ? imgUrl : defaultCover" alt="cover" />
    </el-card>
  </div>
</template>

<script>
import { TEMPLATE } from '@apis/template';

export default {
  name: 'TemplateCard',
  props: {
    imgUrl: {
      type: String,
      required: false,
      default: require('../assets/logo.png')
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      defaultCover: require('../assets/logo.png')
    };
  },
  methods: {
    async go() {
      const { id: pid } = this;
      const res = await this.$http.post(`${TEMPLATE.COPY}/${pid}`);
      const { id: resId } = res;
      console.log(resId);
      this.$router.push({
        name: 'Editor',
        query: {
          id: resId
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pcard-item-wrapper {
  margin: 4px;
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
