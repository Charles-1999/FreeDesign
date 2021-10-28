<template>
  <div
    class="canvas"
    :style="{
      transform: 'scale(' + data.scale + ')',
      width: data.width + 'px',
      height: data.height + 'px'
    }"
    @click.self="handleCanvasClick">
      <!-- 多选时缩放点 -->
      <!-- <template v-if="focusList.length > 1">
        <div class="line" />
        <div
          class="move-point"
          :style="getPointStyle(point)"
          v-for="point in pointList"
          :key="point" />
      </template> -->

      <Element
        v-for="comp in eleSchema"
        :key="comp.uuid"
        :data="comp"
        :active="focusList.includes(comp.uuid)"
        :ref="`ele_${comp.uuid}`"
        @activeChange="onActiveChange" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { formatStyle } from '../../../../utils/style';
import { getCursor } from '../../utils/resizePoint';

import Element from '../element/Element.vue';

export default {
  name: 'Canvas',

  components: { Element },

  data() {
    return {
      // 项目数据
      data: {
        width: 375,
        height: 650,
        scale: 1
      },

      // 上北N 下南S 左西W 右东E
      pointList: ['nw', 'ne', 'sw', 'se']
    };
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList,
      eleSchema: state => state.editor.eleSchema
    })
  },

  methods: {
    onActiveChange(uuid, multi) {
      if (multi) {
        this.$store.commit('editor/ADD_FOCUS', uuid);
      } else {
        console.log('onActiveChange');
        this.$store.commit('editor/SET_FOCUSLIST', [uuid]);
      }
    },

    handleCanvasClick() {
      this.$store.commit('editor/SET_FOCUSLIST', []);
    },

    /**
     * @param {string} point 缩放点的方位
     * @return {Object} 缩放点的样式
     */
    getPointStyle(point) {
      const { focusList, eleSchema, data } = this;
      const elements = eleSchema.filter(_ => focusList.includes(_.uuid));

      // TODO-1 这部分计算提取到computed，避免重复计算
      let maxWidth = 0;
      let maxHeight = 0;
      let minLeft = data.width;
      let minTop = data.height;
      elements.forEach(element => {
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
    box-shadow: 0 3px 10px #dcdcdc;
    background-color: #fff;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==);
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
