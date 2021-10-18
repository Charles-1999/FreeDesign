<template>
  <div class="editor-wrapper">
    <EditorHeader />
    <div class="editor-canvas">
      <Canvas />
    </div>
  </div>
</template>

<script>
import EditorHeader from './components/Header.vue';
import Canvas from './components/canvas/Canvas.vue';

export default {
  name: 'Editor',

  components: {
    EditorHeader,
    Canvas
  }
};
</script>

<style lang="less" scoped>
.editor-wrapper {
  display: grid;
  grid-template-rows: 6rem 1fr;
}
.editor-canvas {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
