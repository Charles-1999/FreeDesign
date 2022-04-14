<template>
  <div class="image-wrap" @dblclick="openImgLib">
    <el-image
      :src="innerUrl || require('../../../assets/images/logo.png')"
      fit="contain" />
  </div>
</template>

<script>
import EventBus from '@utils/eventBus';
import { uploadCos } from '@utils/cos.service';
import QRCode from 'qrcode';
import { defaultStyle } from './config';

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
      innerSelectList: [],

      defaultStyle
    };
  },

  watch: {
    images(val) {
      this.innerUrl = (val[0] || {}).url || '';
    },
    qrcodeText(val) {
      console.log(val);
      this.openImgLib(val);
    }
  },

  created() {
    EventBus.$on('imgLib-confirm', this.handleImgLibConfirm);
    this.openImgLib(this.qrcodeText);
  },

  methods: {
    async openImgLib(text) {
      this.qrCodeUrl = await QRCode.toDataURL(text || 'www.baidu.com', {
        errorCorrectionLevel: 'H',
        version: 9,
        quality: 1,
        scale: 5,
        margin: 0
      });
      this.qrKey = this.CreateUuid();
      const pic = this.dataURLtoFile(this.qrCodeUrl, 'qrcode' + text);
      await uploadCos(pic);
      this.innerUrl = 'https://cjztest-1302847834.cos.ap-nanjing.myqcloud.com/logos/' + `qrcode${text}`;
    },
    CreateUuid() {
      var s = [];

      var hexDigits = '0123456789abcdef';

      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }

      s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010

      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

      s[8] = s[13] = s[18] = s[23] = '-';

      var uuid = s.join('');

      return uuid;
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    /**
     * 图片库选择图片事件
     */
    handleImgLibConfirm(caller, list) {
      if (caller !== this.uuid) return;

      this.$emit('change', {
        images: list
      });
    }
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
