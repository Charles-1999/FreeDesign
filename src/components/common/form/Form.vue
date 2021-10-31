<template>
  <div class="form-wrapper">
    <div
      class="attr-item"
      v-for="(attr, key) in formFieldConfig"
      :key="key">
      <!-- 属性标签 -->
      <span class="label">{{ attr.label }}:</span>

      <!-- 表单项 -->
      <FormItem
        v-if="!attr.children"
        :form="innerGetForm(key)"
        :formKey="key"
        :config="attr"
        @change="handleChange" />
      <!-- 如果有children则遍历渲染children -->
      <FormItem
        v-else
        v-for="(item, key) in attr.children"
        :key="key"
        :form="innerGetForm(key)"
        :formKey="key"
        :config="item"
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
    },

    getForm: {
      type: [Function || undefined],
      required: false,
      default: undefined
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
    },

    innerGetForm(key) {
      if (this.getForm) {
        return this.getForm(key);
      }

      return this.form;
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
