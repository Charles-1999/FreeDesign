<template>
  <video
    :src="url"
    :autoplay="autoplay"
    :loop="loop"
    :controls="controls"></video>
</template>
<script>
import { defaultProps } from './config';

export default {
  name: 'LibVideo',

  props: {
    url: {
      type: String,
      required: false,
      default: defaultProps.url
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: defaultProps.autoplay
    },
    controls: {
      type: Boolean,
      required: false,
      default: defaultProps.controls
    },
    loop: {
      type: Boolean,
      required: false,
      default: defaultProps.loop
    }
  },

  data() {
    return {

    };
  }
};
</script>
