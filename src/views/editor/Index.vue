<template>
  <div class="editor-wrapper">
    <div>
      <el-button
        type="primary"
        @click="addElement('text')">
        文本
      </el-button>
      <el-button
        type="primary"
        @click="addElement('rect')">
        矩形
      </el-button>
      <el-button
        type="primary"
        @click="history('undo')">
        undo
      </el-button>
      <el-button
        type="primary"
        @click="history('redo')">
        redo
      </el-button>
    </div>
    <div
      class="editor-canvas-wrapper"
      ref="canvasWrapper"
      @click.self="handleCanvasWrapperClick">
      <Canvas />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

import Canvas from './components/canvas/Canvas.vue';

export default {
  name: 'Editor',

  components: {
    Canvas
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList,
      eleSchema: state => state.editor.eleSchema
    }),
    ...mapGetters('editor', [
      'getElementByUUID'
    ])
  },

  mounted() {
    // 设置有效的拖拉拽区域
    this.SET_VALID_MOVE_AREA(this.$refs.canvasWrapper);
  },

  methods: {
    ...mapMutations('editor', [
      'SET_VALID_MOVE_AREA'
    ]),

    /**
     * 添加元素
     * @param {string} type type
     * @return {void}
     */
    addElement(type) {
      this.$store.dispatch({
        type: 'editor/addElement',
        element: {
          uuid: new Date().getTime(),
          component: type,
          eleStyle: {
            top: 50,
            left: 70
          }
        }
      });

      this.$store.dispatch('editor/history/record');
    },

    handleCanvasWrapperClick() {
      this.$store.commit('editor/SET_FOCUSLIST', []);
    },

    async history(type) {
      await this.$store.dispatch(`editor/history/${type}`);
    }
  }
};
</script>

<style lang="less" scoped>
.editor-wrapper {
  display: grid;
  grid-template-rows: 6rem 1fr;
}
.editor-canvas-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #efefef;
}
</style>
