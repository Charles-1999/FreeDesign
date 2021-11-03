<template>
  <div class="animation-editor">
    <div class="btn-wrapper">
      <el-button
        type="primary"
        size="small"
        @click="addAnimation">
        添加动画
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="previewAnimation()">
        预览动画
      </el-button>
    </div>

    <!-- 元素的动画列表 -->
    <el-collapse
      class="element-animation-list"
      v-if="currElement.animations.length">
      <el-collapse-item
        class="element-animation-item"
        v-for="(animation, idx) in currElement.animations"
        :key="idx"
        :name="idx">
        <template slot="title">
          <span>动画{{ idx + 1 }}</span>
          <el-button
            class="btn_label"
            size="mini"
            round
            @click.stop="changeAnimation(idx)">
            {{ animation.label }}
            <i class="el-icon-s-fold el-icon--right" />
          </el-button>
          <el-button
            size="mini"
            circle
            plain
            icon="el-icon-caret-right"
            @click.stop="previewAnimation(idx)" />
          <el-button
            size="mini"
            circle
            plain
            icon="el-icon-delete-solid"
            @click.stop="deleteAnimation(idx)" />
        </template>

        <div class="animation-detail">
          <fd-form
            :form-field-config="animationFormConfig"
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
        :activeAnimation="activeAnimation"
        @select="handleSelectAnimation" />
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EventBus from '../../../../utils/eventBus';
import { animationFormConfig } from './config';

import AnimationLib from '../animationLib/AnimationLib.vue';

export default {
  name: 'AnimationEditor',

  components: {
    AnimationLib
  },

  data() {
    return {
      animationLibShow: false,

      // 当前动画名
      activeAnimation: '',
      // 当前动画索引
      currAnimationIdx: -1,
      // 是否为更换动画，用于区分添加动画
      isChangeAnimation: false,

      // 动画编辑表单
      animationFormConfig,
      animationForm: []
    };
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList
    }),
    ...mapGetters('editor', [
      'currPage',
      'currElement'
    ])
  },

  watch: {
    // 当redo undo时，currPage被重新赋值
    // 需要重新计算currElement赋值给表单
    currPage() {
      this.animationForm = this.currElement.animations;
    }
  },

  created() {
    this.animationForm = this.currElement.animations;
  },

  methods: {
    /**
     * 动画表单change事件
     */
    handleAnimationChange() {
      // 触发record操作记录
      this.$store.dispatch('editor/history/record');
    },

    /**
     * 元素添加动画
     */
    addAnimation() {
      // 打开动画库
      this.activeAnimation = '';
      this.isChangeAnimation = false;
      this.animationLibShow = true;
    },

    /**
     * 元素删除动画
     */
    deleteAnimation(idx) {
      this.$store.commit('editor/DELETE_ANIMATION', {
        element: this.currElement,
        animationIdx: idx
      });
    },

    /**
     * 元素更换动画
     */
    changeAnimation(idx) {
      const { currElement } = this;
      const { animations } = currElement;
      const currAnimation = animations[idx];

      // 打开动画库
      this.activeAnimation = currAnimation.name;
      this.isChangeAnimation = true;
      this.currAnimationIdx = idx;
      this.animationLibShow = true;
    },

    /**
     * 动画库select事件
     */
    async handleSelectAnimation(animation) {
      const { isChangeAnimation, currAnimationIdx } = this;

      // 关闭动画库
      this.animationLibShow = false;

      if (isChangeAnimation) {
        // 更换动画
        await this.$store.dispatch('editor/changeAnimation', {
          uuid: this.currElement.uuid,
          animationIdx: currAnimationIdx,
          animation: animation
        });

        await this.$store.dispatch('editor/history/record');
      } else {
        // 添加动画
        await this.$store.dispatch('editor/addAnimation', {
          uuid: this.currElement.uuid,
          animation: animation
        });

        await this.$store.dispatch('editor/history/record');
      }
    },

    /**
     * 预览动画
     */
    previewAnimation(idx) {
      const { currElement } = this;
      const { animations } = currElement;

      // 如果没传入idx，则播放这个元素的全部动画
      // 否则播放这个元素对应索引的动画
      const runAnimations = idx === undefined ? animations : [animations[idx]];
      EventBus.$emit('RunAnimation', this.currElement.uuid, runAnimations);
    }
  }
};
</script>

<style lang="less" scoped>
.element-animation-list {
  margin-top: 20px;
}

.element-animation-item {
  .btn_label {
    margin: 0 20px;
  }
}
</style>
