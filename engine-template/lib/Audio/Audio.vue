<template>
  <audio
    :src="url"
    :autoplay="autoplay"
    :loop="loop"
    :controls="controls" />
</template>

<script>
import { defaultProps } from './config';

export default {
  name: 'LibAudio',

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
