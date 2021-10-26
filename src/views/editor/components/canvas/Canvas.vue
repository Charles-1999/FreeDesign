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
        v-for="comp in eleSchema"
        :key="comp.uuid"
        :data="comp"
        :active="focusList.includes(comp.uuid)"
        :ref="`ele_${comp.uuid}`"
        @activeChange="onActiveChange" />
    </div>
</template>

<script>
import Element from '../element/Element.vue';
import { mapState } from 'vuex';

export default {
  name: 'Canvas',

  components: { Element },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList,
      eleSchema: state => state.editor.eleSchema
    })
  },

  data() {
    return {
      // 项目数据
      data: {
        width: 375,
        height: 650,
        scale: 1
      }
    };
  },

  methods: {
    onActiveChange(uuid) {
      if (this.focusList.includes(uuid)) {
        // this.$store.commit({
        //   type: 'editor/setFocusList',
        //   focusList: []
        // });
      } else {
        this.$store.commit({
          type: 'editor/setFocusList',
          focusList: [uuid]
        });
      }
    },

    handleCanvasClick() {
      // this.focusList = [];
    }
  }
};
</script>

<style lang="less" scoped>
  .canvas-wrapper {
    position: relative;
    box-shadow: 0 3px 10px #dcdcdc;
    background-color: #fff;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==);
  }
</style>
