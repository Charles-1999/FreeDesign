<template>
  <div class="select-image">
    <div class="img-list">
      <div
        class="add-wrap"
        v-if="innerSelectList.length < limit"
        @click="openImgLib">
        <i class="el-icon-plus add-wrap-icon"></i>
      </div>
      <el-card
        class="img-wrap"
        v-for="(img, idx) in innerSelectList"
        :key="idx"
        shadow="never">
        <el-image
          :src="$config.cos.queryUrl + img.key_name"
          fit="contain"
          @click="openImgLib" />
      </el-card>
    </div>
  </div>
</template>

<script>
import EventBus from '@utils/eventBus';

export default {
  name: 'SelectImage',

  props: {
    limit: {
      type: Number,
      required: false,
      default: 99
    },

    selectList: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      imgLibShow: false,

      uuid: `SelectImage${Date.now()}`,

      innerSelectList: this.selectList
    };
  },

  watch: {
    selectList(val) {
      this.innerSelectList = val;
    }
  },

  created() {
    EventBus.$on('imgLib-confirm', this.handleImgLibConfirm);
  },

  methods: {
    /**
     * 图片库关闭事件
     */
    handleLibClose(val) {
      this.imgLibShow = val;
    },

    /**
     * 图片库选择图片事件
     */
    handleImgLibConfirm(caller, list) {
      if (caller !== this.uuid) return;

      this.innerSelectList = list;

      this.$emit('change', list);
    },

    /**
     * 打开图片库
     */
    openImgLib() {
      EventBus.$emit('imgLib-show-change', true, {
        caller: this.uuid,
        selectList: this.innerSelectList,
        limit: this.limit
      });
    }
  }
};
</script>

<style lang="less" scoped>
.add-wrap {
  height: 70px;
  margin-right: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
}

.add-wrap:hover {
  border-color: #409EFF;
  color: #409EFF;
}

.add-wrap-icon {
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}

.img-list {
  display: flex;
  flex-wrap: wrap;

  .img-wrap {
    margin-right: 10px;
    margin-bottom: 10px;

    .el-image {
      width: 70px;
      height: 70px;
      cursor: pointer;
    }
  }

  .img-wrap:nth-child(3n) {
    margin-right: 0;
  }

  ::v-deep.el-card__body {
    width: 70px;
    height: 70px;
    padding: 0;
  }
}

</style>
