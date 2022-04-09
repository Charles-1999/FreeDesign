<template>
<div class="swiper-container">
  <div class="swiper-wrapper">
  <div class="swiper-slide  flat relative hidden" v-for="(inner,index) in innerPage" :key="index">
      <Element
        v-for="comp in inner.elements"
        :key="comp.uuid"
        :data="comp"
        :ref="`ele_${comp.uuid}`" />
    </div>
  </div>
   <div class="swiper-pagination"></div>
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

      innerPage: []
    };
  },

  created() {
    const pageDataFree = window._pageDataFree;
    // 如果参数有传page则渲染参数的page
    console.log(pageDataFree.pages);
    this.innerPage = pageDataFree.pages || this.currPage;
  },
  mounted() {
    const that = this;
    // 判断翻页类型
    var direction = 'vertical';
    // var showSlideNumber = !!this.pageData.slideNumber;
    // eslint-disable-next-line no-new
    new window.Swiper('.swiper-container', {
      direction: direction,
      // loop: false,
      // pagination: showSlideNumber ? { el: '.swiper-pagination' } : {},
      // scrollbar: {
      //   el: '.swiper-scrollbar'
      // },
      on: {
        slideChange: function() {
          console.log(777);
          that.onSwipe();
        }
      }
    });
  },

  methods: {
    onSwipe(index) {
      console.log(777);
      // this.activeIndex = index;
      // this.pageData.pages[this.activeIndex].elements.forEach((e) => {
      //   e._loaded = true;
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-slide{
  width: 100vw;
}
.swiper-container{
    width: 100vw;
    height: 100vh;
}
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
 .relative {
    position: relative;
  }
  .hidden {
    overflow: hidden;
  }
</style>
