<template>
  <div class="image-wrap">
    <el-image
      :src="innerUrl"
      fit="contain" />
  </div>
</template>

<script>

export default {
  name: 'LibQrcode',

  props: {
    images: {
      type: Array,
      required: false,
      default: () => []
    },
    qrcodeText: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      uuid: `Image${Date.now()}`,
      qrKey: '',
      innerUrl: (this.images[0] || {}).url || '',

      imgLibShow: false,
      innerSelectList: []
    };
  },
  created() {
    this.innerUrl = 'https://cjztest-1302847834.cos.ap-nanjing.myqcloud.com/logos/' + `qrcode${this.qrcodeText}`;
    // console.log(this.images, this.qrcodeText, 188);
  },

  methods: {
  }
};
</script>

<style lang="less" scoped>
.image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-image {
    width: 100%;
  }
}
</style>
