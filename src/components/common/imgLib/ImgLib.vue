<template>
  <el-dialog
    class="img-lib"
    width="740px"
    title="我的图片"
    :visible.sync='visible'
    :destroy-on-close="true">
    <!-- footer -->
    <div slot="footer" class="img-lib-footer">
      <el-button
        type="primary"
        @click="confirm">
        确认
      </el-button>
    </div>

    <!-- 图片列表 -->
    <div class="images-list">
      <!-- 上传组件 -->
      <el-upload
        class="upload"
        drag
        multiple
        :show-file-list="false"
        :action="$config.cos.uploadUrl"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :data="uploadData">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>

      <!-- 图片 -->
      <div
        class="image-wrap"
        :class="selectList.map(_ => _.id).includes(img.id) && 'active-img'"
        v-for="img in imagesList"
        :key="img.id"
        @click="handleImgClick(img)">
        <div class="image-inner">
          <el-image
            :src="$config.cos.queryUrl + img.name"
            lazy
            fit="contain" />
          <div class="bar tool-bar">
            <el-button type="text">
              <i class="el-icon-folder" />
            </el-button>
            <el-button
              type="text"
              @click.stop="deleteImg(img)">
              <i class="el-icon-delete" />
            </el-button>
          </div>
          <div class="bar selected-bar">
            <i class="el-icon-check" />
          </div>
        </div>
        <span class="img-name">{{ img.name }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import EventBus from '@utils/eventBus';
import { getUploadToken, uploadCos } from '@utils/cos.service';

export default {
  name: 'ImgLib',

  data() {
    return {
      visible: false,

      // 图片库的照片
      imagesList: [],

      // 调用者
      caller: '',
      // 选择上限
      limit: 99,
      // 选择的图片
      selectList: [],

      // 上传cos的数据
      uploadData: {}
    };
  },

  watch: {
    visible(val) {
      // 如果显示了，就去请求接口
      if (val) this.getImageList();
    }
  },

  created() {
    EventBus.$on('imgLib-show-change', (show, options) => {
      const { caller, limit, selectList } = options;

      this.visible = show;
      this.caller = caller || '';
      this.selectList = [...selectList] || [];
      this.limit = limit || 99;
    });
  },

  methods: {
    /**
     * 获取图片列表
     */
    async getImageList() {
      const { images } = await this.$http.get('/resources/image/list');
      this.imagesList = images;
      console.log(this.imagesList, 121);
    },

    /**
     * 点击图片事件
     */
    handleImgClick(img) {
      const { selectList, limit } = this;
      const idx = selectList.findIndex(_ => _.id === img.id);

      // 如果已被选择，则移除
      if (idx !== -1) {
        selectList.splice(idx, 1);
        return;
      }

      // 图片数量限制
      if (selectList.length >= limit) {
        this.$message({ message: `只能选择${limit}张图片`, type: 'warning' });
        return;
      }

      selectList.push(img);
    },

    /**
     * 删除图片
     */
    async deleteImg(img) {
      await this.$http.delete(`/resources/image/${img.id}`);

      this.imagesList = this.imagesList.filter(_ => _.id !== img.id);
    },

    /**
     * 提交所选择的图片
     */
    confirm() {
      const { selectList, imagesList, caller } = this;

      this.visible = false;

      // 处理图片url
      const returnList = imagesList
        .filter(img => selectList.map(_ => _.id).includes(img.id))
        .map(_ => {
          if (!_.url) {
            _.url = this.$config.cos.queryUrl + _.name;
          }

          return _;
        });

      EventBus.$emit('imgLib-confirm', caller, returnList);
    },

    /**
     * 上传前回调
     */
    async beforeUpload(file) {
      const uploadToken = await getUploadToken();
      uploadCos(file);
      this.$set(this.uploadData, 'token', uploadToken);
    },

    /**
     * 上传成功回调
     */
    async onSuccess(response, file, fileList) {
      const { key } = response;
      const { size, name } = file;

      const { id } = await this.$http.post('/resources/image', {
        key_name: key,
        name,
        size
      });

      this.imagesList.unshift({
        id,
        key_name: key,
        name,
        size
      });
    }
  }
};
</script>

<style lang="less" scoped>
.img-lib-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 50px;

  .title {
    font-size: 16px;
  }
}

.images-list {
  display: flex;
  flex-wrap: wrap;
  max-height: 500px;
  overflow: scroll;

  // 上传组件
  ::v-deep.el-upload-dragger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 265px;
    height: 140px;
    margin-right: 25px;

    .el-icon-upload {
      margin: 0;
    }

    .el-upload__text {
      font-size: 10px;
    }
  }

  // 图片
  .image-wrap {
    display: flex;
    flex-direction: column;
    width: 120px;
    margin-right: 25px;
    margin-bottom: 20px;
    cursor: pointer;

    .image-inner {
      position: relative;
      height: 120px;
      overflow: hidden;

      .el-image {
        width: 120px;
        height: 120px;
        background-color: #F5F7FA;
        border-radius: 6px;
      }
    }

    .img-name {
      text-align: center;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      color: #777;
    }

    // bar条
    .bar {
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      height: 25px;
      font-size: 16px;
      background-color: rgba(0, 0, 0, 0.3);
      transition: transform 0.5s;
    }

    // 图片工具条
    .tool-bar {
      top: 0;
      border-radius: 6px 6px 0 0;
      transform: translateY(-26px);

      .el-button--text {
        color: #fff;
      }

      .el-button--text:hover {
        .el-icon-folder {
          color: #409EFF;
        }
        .el-icon-delete {
          color: rgb(210, 24, 24);
        }
      }
    }

    // 选中条
    .selected-bar {
      bottom: 0;
      color: #409EFF;
      font-size: 22px;
      font-weight: 700;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 0 0 6px 6px;
      transform: translateY(26px);
    }
  }

  .image-wrap:nth-child(5n+4) {
    margin-right: 0;
  }

  .image-wrap:hover {
    .tool-bar {
      transform: translateY(0);
    }
  }

  .image-wrap.active-img {
    .selected-bar {
      transform: translateY(0);
    }
  }
}
</style>
