<template>
  <div class="attr-editor">
    <div class="title">页面通用属性</div>
    <fd-form
      :form-field-config="commonPageStyleFormConfig"
      :form-field-data="commonPageStyleForm"
      @change="handleAttrChange" />

    <div class="title">当前页面样式</div>
    <fd-form
      :form-field-config="pageStyleFormConfig"
      :form-field-data="pageStyleForm"
      @change="handleAttrChange" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { pageStyleFormConfig, commonPageStyleFormConfig } from './config';

export default {
  name: 'PageEditor',

  data() {
    return {
      commonPageStyleFormConfig,
      commonPageStyleForm: {},

      pageStyleFormConfig,
      pageStyleForm: {}
    };
  },

  computed: {
    ...mapState({
      projectData: state => state.editor.projectData
    }),
    ...mapGetters('editor', [
      'currPage'
    ])
  },

  watch: {
    currPage() {
      this.pageStyleForm = this.currPage.pageStyle;
      this.commonPageStyleForm = this.projectData;
    }
  },

  created() {
    this.pageStyleForm = this.currPage.pageStyle;
    this.commonPageStyleForm = this.projectData;
  },

  methods: {
    /**
     * 动画表单change事件
     */
    handleAttrChange() {
      // 触发record操作记录
      this.$store.dispatch('editor/history/record');
    }
  }
};
</script>
