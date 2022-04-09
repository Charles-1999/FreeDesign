<template>
  <div
    class="canvas-element"
    :style="formatStyle(data.eleStyle)"
    ref="element">
    <component
      class="canvas-comp"
      :style="formatStyle(data.compStyle)"
      :is="`lib-${data.component}`"
      v-bind="data.props" />
  </div>
</template>

<script>
import { formatStyle, animateCSS } from '../../utils';
import FreeDesignComponent from '../../lib/index';

export default {
  name: 'Element',
  components: {
    ...FreeDesignComponent
  },
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

  async mounted() {
    console.log(this.data.animations);
    for (const animation of this.data.animations) {
      await animateCSS(this.$el, animation);
    }
  },

  methods: {

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
