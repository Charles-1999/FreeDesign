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
        :ref="`ele_${comp.uuid}`"
        @activeChange="onActiveChange" />
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
          left: '10px',
          width: '300px',
          height: '300px'
        }
      }, {
        uuid: 2,
        component: 'text',
        props: {
          text: '这是一段文字222'
        },
        style: {
          top: '30px',
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

    onActiveChange(uuid) {
      if (this.focusList.includes(uuid)) {
        // this.focusList = [];
      } else {
        this.focusList = [uuid];
      }
    },

    handleCanvasClick() {
      this.focusList = [];
    },

    handleResize(e) {
      console.log(e);
    },

    handleMouseDown(uuid, e) {
      const ele = this.schema.find(_ => _.uuid === uuid);

      let { left, top } = ele.style;
      left = Number(left.split('px').shift());
      top = Number(top.split('px').shift());

      // 鼠标初始位置
      const { clientX: startX, clientY: startY } = e;

      const move = e => {
        e.stopPropagation();
        e.preventDefault();

        // 鼠标移动后的位置
        const { clientX: currX, clientY: currY } = e;

        // curr - start = 鼠标移动距离
        // 元素初始位置 + 鼠标移动距离 = 元素新位置
        ele.style.left = `${currX - startX + left}px`;
        ele.style.top = `${currY - startY + top}px`;
      };

      const up = e => {
        document.removeEventListener('mousemove', move);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
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
