<template>
  <div
    class="canvas-element"
    :class="{ active }"
    :style="data.style"
    ref="element"
    @mousedown.stop="move"
    @click="handleElementClick">
    <component
      class="canvas-comp"
      :is="`lib-${data.component}`"
      v-bind="data.props" />

    <!-- 定位点 -->
    <template v-if="active">
      <div
        class="move-point"
        :style="getPointStyle(point)"
        v-for="point in pointList"
        :key="point"
        @mousedown.stop="resize(point, $event)" />
    </template>
  </div>
</template>

<script>
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
      pointList: ['nw', 'n', 'ne', 'e', 'w', 'sw', 's', 'se']
    };
  },

  methods: {
    /**
     * 实现拖拽
     * @param {object} e event
     */
    move(e) {
      const { data } = this;
      const { style } = data;
      // 鼠标初始位置
      const { clientX: startX, clientY: startY } = e;

      const move = e => {
        e.stopPropagation();
        e.preventDefault();

        const newStyle = { ...style };

        let { left, top } = style;
        left = Number(left.split('px').shift());
        top = Number(top.split('px').shift());

        // 鼠标移动后的位置
        const { clientX: currX, clientY: currY } = e;

        // curr - start = 鼠标移动距离
        // 元素初始位置 + 鼠标移动距离 = 元素新位置
        const moveX = currX - startX;
        const moveY = currY - startY;

        newStyle.left = `${moveX + left}px`;
        newStyle.top = `${moveY + top}px`;

        data.style = newStyle;
      };

      const up = e => {
        document.removeEventListener('mousemove', move);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },

    /**
     * 点击元素事件
     */
    handleElementClick() {
      this.$emit('activeChange', this.data.uuid);
    },

    /**
     * 实现缩放
     * @param {string} point point
     * @param {object} e event
     */
    resize(point, e) {
      const { data } = this;
      const { style } = data;
      // 鼠标初始位置
      const { clientX: startX, clientY: startY } = e;

      const leftPoint = /w/.test(point);
      const topPoint = /n/.test(point);

      const horizontalPoint = /^[w, e]$/.test(point);
      const verticalPoint = /^[n, s]$/.test(point);

      const move = e => {
        e.stopPropagation();
        e.preventDefault();

        const newStyle = { ...style };

        let { left, top, height, width } = style;
        left = Number(left.split('px').shift());
        top = Number(top.split('px').shift());
        width = Number(width.split('px').shift());
        height = Number(height.split('px').shift());

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

        newStyle.width = `${width + deltaWidth}px`;
        newStyle.height = `${height + deltaHeight}px`;
        newStyle.left = `${left + deltaLeft}px`;
        newStyle.top = `${top + deltaTop}px`;

        data.style = newStyle;
      };

      const up = e => {
        document.removeEventListener('mousemove', move);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },

    /**
     * @param {string} point 定位点的方位
     * @return {Object} 定位点的样式
     */
    getPointStyle(point) {
      const leftPoint = /w/.test(point);
      const topPoint = /n/.test(point);

      // 页面元素实例
      const container = this.$refs.element;

      const style = {
        left: leftPoint ? '-5px' : `${container.clientWidth - 5}px`,
        top: topPoint ? '-5px' : `${container.clientHeight - 5}px`,
        marginLeft: ['n', 's'].includes(point) ? '-50%' : 0,
        marginTop: ['w', 'e'].includes(point)
          ? `-${container.clientHeight / 2}px`
          : 0,
        cursor: this.getCursor(point)
      };

      return style;
    },

    /**
     * @param {string} point 定位点的方位
     * @return {string} cursor的值
     */
    getCursor(point) {
      let value = '';

      switch (point) {
        case 'nw':
        case 'se':
          value = 'nwse';
          break;

        case 'ne':
        case 'sw':
          value = 'nesw';
          break;

        case 'n':
        case 's':
          value = 'ns';
          break;

        case 'w':
        case 'e':
          value = 'ew';
          break;
      }

      return `${value}-resize`;
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

.move-point {
  position: absolute;
  width: 6px;
  height: 6px;
  border: 1px solid blue;
  border-radius: 50%;
  background-color: #fff;
  z-index: 999;
}
</style>
