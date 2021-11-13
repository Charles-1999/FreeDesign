<template>
  <div
    class="image-wrap"
    @dblclick="handleDBClick">
    <el-image
      :src="innerUrl" />
  </div>
</template>

<script>
import EventBus from '@utils/eventBus';
import { defaultStyle } from './config';

export default {
  name: 'LibImage',

  props: {
    url: {
      type: String,
      required: false,
      default: ''
    }
  },

  data() {
    return {
      uuid: `Image${Date.now()}`,

      innerUrl: this.url,

      imgLibShow: false,
      innerSelectList: [],

      defaultStyle
    };
  },

  watch: {
    url(val) {
      this.innerUrl = val;
    }
  },

  created() {
    EventBus.$on('imgLib-confirm', this.handleImgLibConfirm);
  },

  methods: {
    handleDBClick() {
      EventBus.$emit('imgLib-show-change', true, {
        caller: this.uuid,
        limit: 1
      });
    },

    /**
     * 图片库关闭事件
     */
    handleLibClose(val) {
      this.imgLibShow = val;
    },

    /**
     * 图片库选择图片事件
     */
    handleImgLibConfirm(caller, list) {
      if (caller !== this.uuid) return;

      this.$emit('change', list);
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
