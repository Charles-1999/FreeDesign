<template>
  <el-tabs
    class="animation-lib"
    type="card">
    <el-tab-pane
      class="animation-lib-list"
      v-for="(type, idx) in animationList"
      :key="idx"
      :label="type.label">
      <!-- 动画item -->
      <div
        class="animation-item"
        :class="activeAnimation === animation.name
          && 'acitve__animation'"
        v-for="(animation, idx) in type.children"
        :key="idx"
        @mouseenter="currAnimation = animation.name"
        @mouseleave="currAnimation = ''"
        @click="selectAnimation(animation)">
        <!-- 动画item_inner 动画主体 -->
        <div
          class="animation-item_inner"
          :class="currAnimation === animation.name
            && `animate__${currAnimation} animate__animated`" />
        <!-- 动画label -->
        <span
          class="animation-item_label"
          :class="currAnimation === animation.name
            && 'curr__animation'">
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

  props: {
    activeAnimation: {
      type: String,
      required: false,
      default: ''
    }
  },

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
}

.animation-item {
  .animate__animated {
    background-color: @primary-color;
  }

  .curr__animation {
    color: @primary-color;
  }
}

.acitve__animation {
  .animation-item_inner {
    background-color: @primary-color;
  }

  .animation-item_label {
    color: @primary-color;
  }
}
</style>
