<template>
  <div
    class="canvas-wrapper"
    :style="{
      transform: 'scale(' + data.scale + ')',
      width: data.width + 'px',
      height: data.height + 'px'
    }">
      <lib-text text="123" />
      <!-- <component
        :is="1" /> -->
    </div>
</template>

<script>
export default {
  name: 'Canvas',

  data() {
    return {
      data: {
        width: 375,
        height: 650,
        scale: 1
      }
    };
  }
};
</script>

<style lang="less" scoped>
  .canvas-wrapper {
    box-shadow: 0 3px 10px #dcdcdc;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==);
  }
</style>
