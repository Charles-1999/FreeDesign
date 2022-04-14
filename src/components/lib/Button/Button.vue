<template>
  <el-button>{{ innerText }}</el-button>
</template>

<script>
import { defaultProps } from './config';

export default {
  name: 'LibButton',

  props: {
    text: {
      type: String,
      required: false,
      default: defaultProps.text
    }
  },

  data() {
    return {
      innerText: this.text
    };
  },

  watch: {
    text(val) {
      this.innerText = val;
    }
  }
};
</script>
