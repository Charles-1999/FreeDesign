<template>
 <el-drawer
  @close="closeDrawer"
  :wrapperClosable="false"
  title="预览"
  :visible.sync="drawer">
  <div class="preview-container">
          <el-form label-width="90px" label-position="left">
        <el-form-item label="页面二维码:">
       <QrcodeVue  :value="pageLink" :size="140" level="H"></QrcodeVue>
        </el-form-item>
        <el-form-item label="页面链接:">
            <div class="share-wx-config-wrapper">{{'http://175.178.86.231:3007/auth/view/' + this.id}}</div>
          <div><el-button type="primary">复制链接</el-button></div>
        </el-form-item>
      </el-form>
  </div>
</el-drawer>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
export default {
  components: {
    // previewWrapper,
    QrcodeVue
  },
  computed: {
    pageLink() {
      return 'http://175.178.86.231:3007/auth/view/' + this.id;
    }
  },
  props: {
    drawer: {
      type: Boolean,
      required: true,
      default: false
    },
    id: {
      type: Number,
      required: true,
      default: 0
    }
    // pageLink: {
    //   type: String,
    //   require: false,
    //   default: ''
    // }
  },
  data() {
    return {
      // drawer: false
    };
  },
  methods: {
    closeDrawer() {
      console.log(121);
      this.$emit('close');
    }
  }
};
</script>

<style>
.preview-container{
  margin: 20px
}
.share-wx-config-wrapper {
    margin-top: 14px;
    padding: 12px;
    background-color: #f0f3f4;
}
</style>
