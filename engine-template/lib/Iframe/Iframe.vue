<template>
  <iframe :src="url"></iframe>
</template>

<script>
import { defaultProps } from './config';

export default {
  name: 'LibIframe',

  props: {
    url: {
      type: String,
      required: false,
      default: defaultProps.url
    }
  },

  data() {
    return {

    };
  }
};
</script>
