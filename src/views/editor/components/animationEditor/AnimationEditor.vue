<template>
  <div class="animation-editor">
    <div class="btn-wrapper">
      <el-button
        type="primary"
        size="small"
        @click="animationLibShow = true">
        添加动画
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="previewAnimation">
        预览动画
      </el-button>
    </div>

    <!-- 元素的动画列表 -->
    <el-collapse
      class="element-animation-list"
      v-if="currElement.animations.length">
      <el-collapse-item
        v-for="(animation, idx) in currElement.animations"
        :key="idx"
        :name="idx">
        <template slot="title">
          <span>动画{{ idx + 1 }}</span>
          <span>{{ animation.label }}</span>
        </template>

        <div class="animation-detail">
          <fd-form
            :form-field-config="animationDetail"
            :form-field-data="animationForm[idx]"
            @change="handleAnimationChange" />
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 动画库 -->
    <el-drawer
      :visible.sync="animationLibShow"
      title="动画库"
      directino="rtl"
      :modal="false"
      :size="390">
      <AnimationLib
        @select="handleSelectAnimation" />
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EventBus from '../../../../utils/eventBus';
import { animationDetail } from './config';

import AnimationLib from '../animationLib/AnimationLib.vue';

export default {
  name: 'AnimationEditor',

  components: {
    AnimationLib
  },

  data() {
    return {
      animationLibShow: false,

      animationDetail,
      animationForm: []
    };
  },

  computed: {
    ...mapState({
      eleSchema: state => state.editor.eleSchema,
      focusList: state => state.editor.focusList
    }),
    ...mapGetters('editor', [
      'getElementByUUID',
      'currElement'
    ])
  },

  watch: {
    // 当redo undo时，eleSchema被重新赋值
    // 需要重新计算currElement赋值给表单
    eleSchema() {
      this.animationForm = this.currElement.animations;
    }
  },

  created() {
    this.animationForm = this.currElement.animations;
  },

  methods: {
    /**
     * 处理动画change事件
     */
    handleAnimationChange() {
      // 触发record操作记录
      this.$store.dispatch('editor/history/record');
    },

    handleSelectAnimation(animation) {
      // 关闭动画库
      this.animationLibShow = false;

      const animationDetail = {
        name: animation.value,
        label: animation.label
      };

      this.$store.dispatch('editor/addAnimation', {
        uuid: this.currElement.uuid,
        animation: animationDetail
      });
    },

    /**
     * 预览动画
     */
    previewAnimation() {
      EventBus.$emit('RunAnimation', this.currElement.uuid, this.currElement.animations);
    }
  }
};
</script>

<style lang="less" scoped>
.element-animation-list {
  margin-top: 20px;
}
</style>
