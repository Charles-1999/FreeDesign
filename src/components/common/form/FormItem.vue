<template>
  <div
    class="form-item_wrapper">
    <div
      v-for="(item, key) in items"
      :key="key"
      class="form-item">
      <!-- 数字输入框 -->
      <el-input-number
        v-if="item.type === 'number'"
        v-bind="attr.config"
        :size="(attr.config || {}).size || 'mini'"
        :controls-position="(attr.config || {}).controlsPosition || 'right'"
        v-model="form[getKeyPath(key)][key]"
        @change="handleChange(key, attr, $event)" />

      <!-- 颜色选择器 -->
      <el-color-picker
        v-if="item.type === 'color'"
        v-bind="attr.config"
        :size="(attr.config || {}).size || 'mini'"
        v-model="form[getKeyPath(key)][key]"
        @change="handleChange(key, attr, $event)" />

      <!-- Element UI -->
      <component
        v-if="item.type.startsWith('el-')"
        v-bind="attr.config"
        :is="item.type"
        v-model="form[getKeyPath(key)][key]"
        @change="handleChange(key, attr, $event)" />

      <!-- 底部文字 -->
      <div class="form-item_text">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormItem',

  props: {
    form: {
      type: Object,
      required: true,
      default: () => ({})
    },

    attr: {
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

  watch: {
    attr: {
      immediate: true,
      handler(val) {
        // 如果是有children，则遍历渲染children
        if (val.children) {
          this.items = val.children;
        } else {
          this.items = {
            [this.formKey]: val
          };
        }
      }
    }
  },

  data() {
    return {
      items: {}
    };
  },

  methods: {
    /**
     * 处理表单项change事件
     */
    handleChange(key, attr, val) {
      this.$emit('change', { key, attr, val });
    },

    /**
     * 获取表单项绑定的model属性
     * @param {string} key key
     * @return {string} modelKey
     */
    getKeyPath(key) {
      const eleStyleKeys = ['left', 'top'];

      if (eleStyleKeys.includes(key)) {
        return 'eleStyle';
      }

      return 'compStyle';
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
