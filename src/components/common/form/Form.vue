<template>
  <div class="form-wrapper">
    <div
      class="attr-item"
      v-for="(attr, key) in formFieldConfig"
      :key="key">
      <!-- 属性标签 -->
      <span class="label">{{ attr.label }}:</span>

      <!-- 属性编辑器 -->
      <FormItem
        :form="form"
        :attr="attr"
        :formKey="key"
        @change="handleChange" />
    </div>
  </div>
</template>

<script>
import FormItem from './FormItem.vue';

export default {
  name: 'Form',

  components: {
    FormItem
  },

  props: {
    formFieldConfig: {
      type: Object,
      required: true,
      default: () => ({})
    },

    formFieldData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data() {
    return {
      form: this.formFieldData
    };
  },

  methods: {
    /**
     * 处理表单项change事件
     */
    handleChange({ key, attr, val }) {
      this.$emit('change', { key, attr, val });
    }
  }
};
</script>

<style lang="less" scoped>
.attr-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  .label {
    width: 100px;
  }
}
</style>
