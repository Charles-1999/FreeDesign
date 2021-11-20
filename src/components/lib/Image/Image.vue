<template>
  <div
    class="image-wrap"
    @dblclick="openImgLib">
    <el-image
      :src="innerUrl"
      fit="contain" />
  </div>
</template>

<script>
import EventBus from '@utils/eventBus';
import { defaultStyle } from './config';

export default {
  name: 'LibImage',

  props: {
    images: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data() {
    return {
      uuid: `Image${Date.now()}`,

      innerUrl: (this.images[0] || {}).url || '',

      imgLibShow: false,
      innerSelectList: [],

      defaultStyle
    };
  },

  watch: {
    images(val) {
      this.innerUrl = (val[0] || {}).url || '';
    }
  },

  created() {
    EventBus.$on('imgLib-confirm', this.handleImgLibConfirm);
  },

  methods: {
    openImgLib() {
      EventBus.$emit('imgLib-show-change', true, {
        caller: this.uuid,
        limit: 1,
        selectList: []
      });
    },

    /**
     * 图片库选择图片事件
     */
    handleImgLibConfirm(caller, list) {
      if (caller !== this.uuid) return;

      this.$emit('change', {
        images: list
      });
    }
  }
};
</script>

<style lang="less" scoped>
.image-wrap {
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
