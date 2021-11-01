<template>
  <el-tabs
    class="animation-lib"
    type="card">
    <el-tab-pane
      class="animation-lib-list"
      v-for="(type, idx) in animationList"
      :key="idx"
      :label="type.label">
      <div
        class="animation-item"
        v-for="(animation, idx) in type.children"
        :key="idx"
        @mouseenter="currAnimation = animation.value"
        @mouseleave="currAnimation = ''"
        @click="selectAnimation(animation)">
        <div
          class="animation-item_inner"
          :class="currAnimation === animation.value && `animate__${currAnimation} animate__animated`" />
        <span
          class="animation-item_label"
          :class="currAnimation === animation.value && 'active__animation'">
          {{ animation.label }}
        </span>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { animationList } from './config';

export default {
  name: 'AnimationLib',

  data() {
    return {
      animationList,

      currAnimation: ''
    };
  },

  methods: {
    /**
     * 选择动画
     */
    selectAnimation(animation) {
      this.$emit('select', animation);
    }
  }
};
</script>

<style lang="less" scoped>
.animation-lib {
  padding: 0 20px;
}

.animation-lib-list {
  display: flex;
  flex-wrap: wrap;
}

.animation-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-bottom: 15px;
  font-size: 12px;
  cursor: pointer;

  .animation-item_inner {
    width: 40px;
    height: 40px;
    background-color: #ccc;
    margin-bottom: 5px;
  }

  .animate__animated {
    background-color: #409EFF;
  }

  .active__animation {
    color: #409EFF;
  }
}
</style>
