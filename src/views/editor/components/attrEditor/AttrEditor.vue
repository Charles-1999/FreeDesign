<template>
  <div class="attr-editor">
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

      activeCollapse: [0, 1, 2]
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
    }
  },

  created() {
    this.attrForm = this.currElement;
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

    getForm(key) {
      const { attrForm } = this;

      const eleStyleKeys = ['left', 'top'];

      if (eleStyleKeys.includes(key)) {
        return attrForm.eleStyle;
      }

      return attrForm.compStyle;
    }
  }
};
</script>

<style lang="less" scoped>
.attr-editor {
  width: 100%;
  padding: 0 10px;
}
</style>
