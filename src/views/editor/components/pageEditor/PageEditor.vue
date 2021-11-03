<template>
  <div class="attr-editor">
    <div class="title">当前页面样式</div>
    <fd-form
      :form-field-config="pageStyleFormConfig"
      :form-field-data="pageStyleForm"
      @change="handleAttrChange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { pageStyleFormConfig } from './config';

export default {
  name: 'PageEditor',

  data() {
    return {
      pageStyleFormConfig,
      pageStyleForm: {}
    };
  },

  computed: {
    ...mapGetters('editor', [
      'currPage'
    ])
  },

  watch: {
    currPage() {
      this.pageStyleForm = this.currPage.pageStyle;
    }
  },

  created() {
    this.pageStyleForm = this.currPage.pageStyle;
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
