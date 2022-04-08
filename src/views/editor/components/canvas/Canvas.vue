<template>
  <div
    class="canvas"
    :style="{
      ...formatStyle(innerPage.pageStyle),
    }"
    @click.self="handleCanvasClick">
      <!-- 多选时缩放点 -->
      <template v-if="focusList.length > 1">
        <div class="line" />
        <div
          class="move-point"
          :style="getPointStyle(point)"
          v-for="point in pointList"
          :key="point" />
      </template>

      <Element
        v-for="comp in innerPage.elements"
        :key="comp.uuid"
        :data="comp"
        :active="focusList.includes(comp.uuid) && !preview"
        :ref="`ele_${comp.uuid}`"
        @activeChange="onActiveChange" />
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { formatStyle } from '@utils/style';
import { getCursor } from '../../utils/resizePoint';

import Element from '../element/Element.vue';

export default {
  name: 'Canvas',

  components: { Element },

  props: {
    page: {
      type: Object,
      required: false,
      default: undefined
    },

    preview: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      // 上北N 下南S 左西W 右东E
      pointList: ['nw', 'ne', 'sw', 'se'],

      formatStyle,

      innerPage: {}
    };
  },

  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      focusList: state => state.editor.focusList
    }),
    ...mapGetters('editor', [
      'currPage'
    ])
  },

  watch: {
    currPage() {
      this.innerPage = this.page || this.currPage;
    }
  },

  created() {
    // 如果参数有传page则渲染参数的page
    this.innerPage = this.page || this.currPage;
  },

  methods: {
    onActiveChange(uuid, multi) {
      if (multi) {
        this.$store.commit('editor/ADD_FOCUS', uuid);
      } else {
        this.$store.commit('editor/SET_FOCUSLIST', [uuid]);
      }

      this.$emit('element-active-change');
    },

    /**
     * 画布点击事件
     */
    handleCanvasClick() {
      if (!this.focusList.length) return;

      this.$store.commit('editor/SET_FOCUSLIST', []);

      this.$emit('element-active-change');
    },

    /**
     * @param {string} point 缩放点的方位
     * @return {Object} 缩放点的样式
     */
    getPointStyle(point) {
      const { focusList, currPage: { elements }, data } = this;
      const focusElements = elements.filter(_ => focusList.includes(_.uuid));

      // TODO-1 这部分计算提取到computed，避免重复计算
      let maxWidth = 0;
      let maxHeight = 0;
      let minLeft = data.width;
      let minTop = data.height;
      focusElements.forEach(element => {
        const { compStyle, eleStyle } = element;
        const totalWidth = compStyle.width + eleStyle.left;
        const totalHeight = compStyle.height + eleStyle.top;

        if (totalWidth >= maxWidth) maxWidth = totalWidth;
        if (totalHeight >= maxHeight) maxHeight = totalHeight;
        if (eleStyle.left <= minLeft) minLeft = eleStyle.left;
        if (eleStyle.top <= minTop) minTop = eleStyle.top;
      });

      const leftPoint = /w/.test(point);
      const topPoint = /n/.test(point);

      const style = {
        left: leftPoint ? minLeft - 5 : maxWidth - 5,
        top: topPoint ? minTop - 5 : maxHeight - 5,
        marginLeft: ['n', 's'].includes(point) ? '-50%' : 0,
        marginTop: ['w', 'e'].includes(point)
          ? -(maxHeight / 2)
          : 0,
        cursor: getCursor(point)
      };

      return formatStyle(style);
    }

  }
};
</script>

<style lang="less" scoped>
  .canvas {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 3px 10px #dcdcdc;
  }

  .move-point {
    position: absolute;
    width: 7px;
    height: 7px;
    border: 1px solid red;
    // border-radius: 50%;
    background-color: #fff;
    z-index: 1000;
}
</style>
