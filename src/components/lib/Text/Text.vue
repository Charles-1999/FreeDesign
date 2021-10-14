<template>
  <div>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'LibText',

  props: {
    text: {
      type: String,
      required: true,
      default: ''
    }
  }
};
</script>
