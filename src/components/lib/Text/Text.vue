<template>
  <div>
    <span
      ref="span"
      @dblclick="handleDbClick"
      @blur="handleChange">
      {{ innerText }}
    </span>
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
  },

  data() {
    return {
      innerText: this.text
    };
  },

  methods: {
    /**
     * 处理双击事件
     * @return {void}
     */
    handleDbClick() {
      // 双击编辑
      this.$refs.span.contentEditable = true;
      this.$refs.span.focus();
    },

    /**
     * 处理文本change事件
     * @return {void}
     */
    handleChange() {
      const text = this.$refs.span.innerHTML;

      this.innerText = text;
      this.$emit('change', text);
    }
  }
};
</script>
