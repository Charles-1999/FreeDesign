<template>
  <div class="canvas">
    <Element
      v-for="comp in innerPage.elements"
      :key="comp.uuid"
      :data="comp"
      :ref="`ele_${comp.uuid}`" />
  </div>
</template>

<script>
import { formatStyle } from '../../utils';
import Element from '../src/Element.vue';

export default {
  name: 'engineH5Swiper',

  components: { Element },

  props: {
    page: {
      type: Object,
      required: false,
      default: undefined
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

  created() {
    const pageDataFree = window._pageDataFree;
    // 如果参数有传page则渲染参数的page
    this.innerPage = pageDataFree.pages[0] || this.currPage;
    console.log(this.innerPage, 133);
  },

  methods: {}
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
