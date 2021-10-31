<template>
  <div class="animate-editor">
    <div class="btn-wrapper">
      <el-button
        type="primary"
        size="small"
        @click="animateLibShow = true">
        添加动画
      </el-button>
      <el-button
        type="primary"
        size="small">
        预览动画
      </el-button>
    </div>

    <el-collapse class="element-animate-list">
      <el-collapse-item
        v-for="(animate, idx) in currAnimate.animations"
        :key="idx">

        </el-collapse-item>
    </el-collapse>

    <!-- 动画库 -->
    <el-drawer
      :visible.sync="animateLibShow"
      title="动画库"
      directino="rtl"
      :modal="false"
      :size="390">
      <AnimateLib
        @select="handleSelectAnimate" />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AnimateLib from '../animateLib/AnimateLib.vue';

export default {
  name: 'AnimateEditor',

  components: {
    AnimateLib
  },

  data() {
    return {
      animateLibShow: false
    };
  },

  computed: {
    ...mapGetters('editor', [
      'currElement'
    ])
  },

  methods: {
    handleSelectAnimate(animate) {
      // 关闭动画库
      this.animateLibShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.animate-item {
  width: 50px;
  height: 50px;
  background-color: #ccc;
}
</style>
