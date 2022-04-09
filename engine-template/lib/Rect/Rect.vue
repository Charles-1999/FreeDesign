<template>
  <div
    class="rect"
    :style="defaultStyle" />
</template>

<script>
import { defaultStyle } from './config';

export default {
  name: 'LibRect',

  props: {

  },

  data() {
    return {
      defaultStyle
    };
  }
};
</script>
