<template>
  <div
    class="canvas-element"
    :class="{ active }"
    :style="data.style"
    ref="element">
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
        :key="point" />
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
        marginTop: ['w', 'e'].includes(point) ? `-${container.clientHeight / 2}px` : 0,
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
  }
</style>
