<template>
  <el-tabs
    class="animate-lib"
    type="card">
    <el-tab-pane
      class="animate-lib-list"
      v-for="(type, idx) in animateList"
      :key="idx"
      :label="type.label">
      <div
        class="animate-item"
        v-for="(animate, idx) in type.children"
        :key="idx"
        @mouseenter="currAnimate = animate.value"
        @mouseleave="currAnimate = ''"
        @click="selectAnimate">
        <div
          class="animate-item_inner"
          :class="currAnimate === animate.value && `animate__${currAnimate} animate__animated`" />
        <span
          class="animate-item_label"
          :class="currAnimate === animate.value && 'active__animate'">
          {{ animate.label }}
        </span>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { animateList } from './config';

export default {
  name: 'AnimateLib',

  data() {
    return {
      animateList,

      currAnimate: ''
    };
  },

  methods: {
    /**
     * 选择动画
     */
    selectAnimate() {
      const { currAnimate } = this;

      this.$emit('select', currAnimate);
    }
  }
};
</script>

<style lang="less" scoped>
.animate-lib {
  padding: 0 20px;
}

.animate-lib-list {
  display: flex;
  flex-wrap: wrap;
}

.animate-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-bottom: 15px;
  font-size: 12px;
  cursor: pointer;

  .animate-item_inner {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    margin-bottom: 5px;
  }

  .animate__animated {
    background-color: #409EFF;
  }

  .active__animate {
    color: #409EFF;
  }
}
</style>
