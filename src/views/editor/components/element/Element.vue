<template>
  <div
    class="canvas-element"
    :class="{ active }"
    :style="formatStyle(data.eleStyle)"
    ref="element"
    @mousedown.stop="handleElementMouseDown">
    <component
      class="canvas-comp"
      :style="formatStyle(data.compStyle)"
      :is="`lib-${data.component}`"
      v-bind="data.props" />

    <!-- 缩放点 -->
    <template v-if="active">
      <div
        class="move-point"
        :style="getPointStyle(point)"
        v-for="point in pointList"
        :key="point"
        @mousedown.stop="handlePointMouseDown(point, $event)" />
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { formatStyle } from '../../../../utils/style';
import { getCursor } from '../../utils/resizePoint';

export default {
  name: 'Element',

  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    },

    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      // 上北N 下南S 左西W 右东E
      pointList: ['nw', 'n', 'ne', 'e', 'w', 'sw', 's', 'se'],

      formatStyle
    };
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList,
      validMoveArea: state => state.editor.validMoveArea
    }),
    ...mapGetters('editor', [
      'getElementByUUID'
    ])
  },

  methods: {
    /**
     * 处理鼠标在元素按下的事件
     * 主要处理元素的拖拽移动、触发聚焦
     * @param {object} e event
     */
    handleElementMouseDown(e) {
      const { focusList, validMoveArea } = this;
      const eleStyleList = focusList
        .map(uuid => this.getElementByUUID(uuid).eleStyle);

      // 鼠标初始位置
      const { clientX: startX, clientY: startY } = e;
      let hasMove = false;

      /**
       * 处理鼠标移动事件
       */
      const move = e => {
        e.stopPropagation();
        e.preventDefault();

        hasMove = true;

        // 鼠标移动后的位置
        const { clientX: currX, clientY: currY } = e;

        // 鼠标位移矢量
        const moveX = currX - startX;
        const moveY = currY - startY;

        // 通知选中的元素进行位移
        focusList.forEach((uuid, idx) => {
          this.$store.dispatch('editor/elementMove', {
            uuid,
            moveX,
            moveY,
            eleStyle: eleStyleList[idx]
          });
        });
      };

      /**
       * 处理鼠标按键弹起事件
       */
      const up = e => {
        validMoveArea.removeEventListener('mousemove', move);
        validMoveArea.removeEventListener('mouseup', up);

        // 如果没有移动，触发聚焦，不触发record操作记录
        if (!hasMove) {
          this.$emit('activeChange', this.data.uuid, e.metaKey);
          return;
        };
        this.$store.dispatch('editor/history/record');
      };

      validMoveArea.addEventListener('mousemove', move);
      validMoveArea.addEventListener('mouseup', up);
    },

    /**
     * 处理鼠标在缩放点按下的事件
     * 主要处理元素的拖拽缩放
     * TODO: 多选缩放
     * @param {string} point point
     * @param {object} e event
     */
    handlePointMouseDown(point, e) {
      const { data, validMoveArea } = this;
      const { eleStyle, compStyle, uuid } = data;

      // 鼠标初始位置
      const { clientX: startX, clientY: startY } = e;
      let hasMove = false;

      // 在左侧和在上面的点
      const leftPoint = /w/.test(point);
      const topPoint = /n/.test(point);

      // 水平和垂直的点
      const horizontalPoint = /^[w, e]$/.test(point);
      const verticalPoint = /^[n, s]$/.test(point);

      /**
       * 处理鼠标移动事件
       */
      const move = async e => {
        e.stopPropagation();
        e.preventDefault();

        hasMove = true;

        const newEleStyle = { ...eleStyle };
        const newCompStyle = { ...compStyle };

        const { left, top } = eleStyle;
        const { height, width } = compStyle;

        // 鼠标移动后的位置
        const { clientX: currX, clientY: currY } = e;

        // curr - start = 鼠标移动距离
        // 元素初始位置 + 鼠标移动距离 = 元素新位置
        const moveX = currX - startX;
        const moveY = currY - startY;

        // 宽、高、左、右的增量
        let deltaWidth = moveX;
        let deltaHeight = moveY;
        let deltaLeft = 0;
        let deltaTop = 0;

        // 上面3个点需要垂直位移、高度增量取反
        if (topPoint) {
          deltaTop = moveY;
          deltaHeight *= -1;
        }

        // 左边3个点需要水平位移、宽度增量取反
        if (leftPoint) {
          deltaLeft = moveX;
          deltaWidth *= -1;
        }

        // 水平的点不改变高度
        if (horizontalPoint) {
          deltaHeight = 0;
        }

        // 垂直的点不改变宽度
        if (verticalPoint) {
          deltaWidth = 0;
        }

        newCompStyle.width = width + deltaWidth;
        newCompStyle.height = height + deltaHeight;
        newEleStyle.left = left + deltaLeft;
        newEleStyle.top = top + deltaTop;

        this.$store.dispatch('editor/updateStyle', {
          uuid,
          compStyle: newCompStyle,
          eleStyle: newEleStyle
        });
      };

      /**
       * 处理鼠标按键弹起事件
       */
      const up = e => {
        validMoveArea.removeEventListener('mousemove', move);
        validMoveArea.removeEventListener('mouseup', up);

        // 如果没有移动，不触发record操作记录
        if (!hasMove) return;
        this.$store.dispatch('editor/history/record');
      };

      validMoveArea.addEventListener('mousemove', move);
      validMoveArea.addEventListener('mouseup', up);
    },

    /**
     * 获取缩放点的样式
     * @param {string} point 缩放点的方位
     * @return {Object} 缩放点的样式
     */
    getPointStyle(point) {
      const { data } = this;
      const { compStyle } = data;

      const { height, width } = compStyle;

      const leftPoint = /w/.test(point);
      const topPoint = /n/.test(point);

      const style = {
        left: leftPoint ? -5 : width - 5,
        top: topPoint ? -5 : height - 5,
        marginLeft: ['n', 's'].includes(point) ? '-50%' : 0,
        marginTop: ['w', 'e'].includes(point)
          ? -(height / 2)
          : 0,
        cursor: getCursor(point)
      };

      return formatStyle(style);
    }
  }
};
</script>

<style lang="less" scoped>
.canvas-element {
  position: absolute;
  border: 1px dashed transparent;
  cursor: move;
}

.canvas-element.active {
  border-color: blue;
}

.canvas-comp {
  overflow: hidden;
}

.move-point {
  position: absolute;
  width: 7px;
  height: 7px;
  border: 1px solid blue;
  border-radius: 50%;
  background-color: #fff;
  z-index: 999;
}
</style>
