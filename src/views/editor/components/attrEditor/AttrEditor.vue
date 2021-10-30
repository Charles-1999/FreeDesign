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
      eleSchema: state => state.editor.eleSchema,
      focusList: state => state.editor.focusList
    }),
    ...mapGetters('editor', [
      'getElementByUUID'
    ]),

    currElement() {
      const { focusList } = this;
      if (focusList.length > 1) {
        return {};
      }

      const currElement = this.getElementByUUID(focusList[0]);

      return currElement;
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
