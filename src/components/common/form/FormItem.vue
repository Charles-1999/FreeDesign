<template>
  <div class="form-item">
    <!-- 数字输入框 -->
    <el-input-number
      v-if="config.type === 'number'"
      v-bind="config.config"
      :size="(config.config || {}).size || 'mini'"
      :controls-position="(config.config || {}).controlsPosition || 'right'"
      v-model="form[formKey]"
      @change="handleChange(formKey, config, $event)" />

    <!-- 颜色选择器 -->
    <el-color-picker
      v-if="config.type === 'color'"
      v-bind="config.config"
      :size="(config.config || {}).size || 'mini'"
      v-model="form[formKey]"
      @change="handleChange(formKey, config, $event)" />

    <!-- Element UI -->
    <component
      v-if="config.type.startsWith('el-')"
      v-bind="config.config"
      :is="config.type"
      v-model="form[formKey]"
      @change="handleChange(formKey, config, $event)" />

    <!-- 底部文字 -->
    <div class="form-item_text">
      {{ config.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',

  props: {
    config: {
      type: Object,
      required: false,
      default: () => ({})
    },

    form: {
      type: Object,
      required: true,
      default: () => ({})
    },

    formKey: {
      type: String,
      required: true,
      default: ''
    }
  },

  methods: {
    /**
     * 处理表单项change事件
     */
    handleChange(key, attr, val) {
      this.$emit('change', { key, attr, val });
    }
  }
};
</script>

<style lang="less" scoped>
.form-item_wrapper {
  flex: 1;
  display: flex;
}

.form-item {
  margin-right: 20px;

  .form-item_text {
    font-size: 12px;
    color: #666;
    text-align: center;
  }

  .el-slider {
    width: 230px;
  }

  ::v-deep.el-slider__runway.show-input {
    margin-right: 120px;
  }

  ::v-deep.el-slider__input {
    width: 100px;
  }

  .el-input-number--mini {
    width: 90px;
  }
}
</style>
