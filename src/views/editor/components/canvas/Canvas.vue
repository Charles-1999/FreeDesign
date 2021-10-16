<template>
  <div
    class="canvas-wrapper"
    :style="{
      transform: 'scale(' + data.scale + ')',
      width: data.width + 'px',
      height: data.height + 'px'
    }"
    @click.self="handleCanvasClick">
      <Element
        v-for="comp in schema"
        :key="comp.uuid"
        :data="comp"
        :active="focusList.includes(comp.uuid)"
        @click.native="handleElementClick(comp.uuid)" />
    </div>
</template>

<script>
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

      // 页面元素数据
      schema: [{
        uuid: 1,
        component: 'text',
        props: {
          text: '这是一段文字'
        },
        style: {
          top: '0px',
          left: '10px'
        }
      }, {
        uuid: 2,
        component: 'text',
        props: {
          text: '这是一段文字222'
        },
        style: {
          top: '20px',
          left: '20px'
        }
      }],

      focusList: []
    };
  },

  methods: {
    handleElementClick(uuid) {
      if (this.focusList.includes(uuid)) {
        this.focusList = [];
      } else {
        this.focusList = [uuid];
      }
    },

    handleCanvasClick() {
      this.focusList = [];
    }
  }
};
</script>

<style lang="less" scoped>
  .canvas-wrapper {
    position: relative;
    box-shadow: 0 3px 10px #dcdcdc;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==);
  }
</style>
