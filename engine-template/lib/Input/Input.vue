<template>
  <input
    :placeholder="placeholder" />
</template>

<script>
import { defaultProps } from './config';

export default {
  name: 'LibInput',

  props: {
    placeholder: {
      type: String,
      required: false,
      default: defaultProps.placeholder
    }
  },

  data() {
    return {

    };
  }
};
</script>
