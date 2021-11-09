<template>
  <svg
    class="iconfont"
    :style="{
      fontSize: `${size}px`
    }"
    aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },

    size: {
      type: Number,
      required: false,
      default: 14
    }
  }
};
</script>
