<template>
  <div class="attr-editor">
    <template v-if="Object.keys(compFormConfig).length">
      <div class="title">组件属性</div>
      <fd-form
        :form-field-config="compFormConfig"
        :form-field-data="currElement.props"
        @change="handlePropsChange" />
    </template>

    <div class="title">基础属性</div>
    <el-collapse
      v-model="activeCollapse">
      <el-collapse-item
        v-for="(attr, idx) in baseAttr"
        :key="idx"
        :name="idx"
        :title="attr.label">
        <fd-form
          :form-field-config="attr.options"
          :form-field-data="attrForm"
          :get-form="getForm"
          @change="handleAttrChange" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { baseAttr } from './config';

export default {
  name: 'AttrEditor',

  data() {
    return {
      baseAttr,

      attrForm: {},

      compFormConfig: {},

      activeCollapse: [0, 1, 2, 3]
    };
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList
    }),
    ...mapGetters('editor', [
      'currPage',
      'currElement'
    ])
  },

  watch: {
    // 当redo undo时，currPage被重新赋值
    // 需要重新计算currElement赋值给表单
    currPage() {
      this.attrForm = this.currElement;
    },

    currElement() {
      this.getCompAttrFormConfig();
    }
  },

  created() {
    this.attrForm = this.currElement;
    this.getCompAttrFormConfig();
  },

  methods: {
    ...mapActions('editor', [
      'updateStyle'
    ]),

    /**
     * 处理属性change事件
     */
    handleAttrChange() {
      // 触发record操作记录
      this.$store.dispatch('editor/history/record');
    },

    handlePropsChange(...args) {
      // 触发record操作记录
      this.$store.dispatch('editor/history/record');
    },

    getForm(key) {
      const { attrForm } = this;

      const eleStyleKeys = ['left', 'top'];

      if (eleStyleKeys.includes(key)) {
        return attrForm.eleStyle;
      }

      return attrForm.compStyle;
    },

    /**
     * 获取组件属性表单
     */
    getCompAttrFormConfig() {
      const { currElement } = this;
      const { component } = currElement;

      const libComp = require.context(
        // 其组件目录的相对路径
        '../../../../components/lib',
        // 是否查询其子目录
        true,
        // 匹配基础组件文件名的正则表达式
        /\.\/(\w+\/config\.js$)/
      );
      const fileName = component.replace(component[0], component[0].toUpperCase());
      const compConfig = libComp(`./${fileName}/config.js`);

      const { attrFormConfig } = compConfig;

      this.compFormConfig = attrFormConfig || {};
    }
  }
};
</script>

<style lang="less" scoped>
.attr-editor {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 10px;

  ::v-deep.el-textarea__inner {
    width: auto;
  }
}
</style>
