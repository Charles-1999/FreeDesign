<template>
  <div class="pcard-item-wrapper" @click="go">
    <el-card
      class="pcard-item-container"
      shadow="hover"
      :body-style="{ padding: 0 }">
      <i
        class="el-icon-circle-plus-outline"
        :style="{ fontSize: '100px', fontWeight: '100', marginTop: '110px' }"
        v-if="id === undefined" />
      <div class="items-container" v-else>
        <div class="pic-container">
          <el-image
            style="width: 100%; height: 220px"
            fit="container"
            :src="
              imgUrl ||
              'https://cjztest-1302847834.cos.ap-nanjing.myqcloud.com/logos/v2-7f567cba4f40593f5bf288155a15aec7_720w.jpeg'
            "
            alt="cover" />
        </div>
        <section class="data-container">
          <div>
            <el-tag size="mini">H5</el-tag>
            <el-tag size="mini" type="success" style="margin-left: 5px">已发布</el-tag>
          </div>
          <div class="text">未命名场景</div>
          <div class="date">2022-4-13</div>
        </section>
        <div>
          <div class="data-footer">
            <div>浏览量: 0</div>
            <div>访问量: 0</div>
          </div>
        </div>
        <div class="header-mask">
          <div class="details-btn">
           <QrcodeVue  :value="pageLink" :size="160" level="H"></QrcodeVue>
          </div>
          <div class="func-section">
            <div>
              <img
                src="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic编辑 (1).png
" />编辑
            </div>
            <div @click="copyData">
              <img
                src="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic分享 (2).png
" />分享
            </div>
            <div @click="deletePage($event,id)">
              <img
                src="https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic删除.png

" />删除
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Image from '../../engine-template/lib/Image/Image.vue';
import QrcodeVue from 'qrcode.vue';
export default {
  components: { Image, QrcodeVue },
  name: 'ProjectCard',

  props: {
    imgUrl: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: Number,
      required: false,
      default: undefined
    },
    mode: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageLink() {
      return 'http://175.178.86.231:3007/auth/view/' + this.id;
    }
  },
  methods: {
    go() {
      this.$router.push({
        name: 'Editor',
        query: {
          id: this.id,
          page_mode: this.mode
        }
      });
    },
    copyData(e) {
      // 如果不需要回调：
      e.stopPropagation();
      e.preventDefault();
      this.$copyText(this.pageLink);
      // 如果需要回调：
      this.$copyText(this.pageLink).then(e => {
        alert('分享链接复制成功');
        console.log(e);
      }, function(e) {
        alert('复制失败');
        console.log(e);
      });
    },
    deletePage(e, ids) {
      // console.log(id);
      e.stopPropagation();
      e.preventDefault();
      this.$alert('确定删除改页面吗', 'free design', {
        confirmButtonText: '确定',
        callback: async (ids, item) => {
          console.log(item);
          await this.$http.delete(`/page/${30}`);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep.pcard-item-wrapper {
  margin: 2rem 1.5rem;
  cursor: pointer;
  overflow: hidden;
  .container-footer {
    width: 40%;
    display: flex;
    margin-left: 5px;
    margin-bottom: 5px;
    justify-content: space-between;
    font-weight: lighter;
  }

  .add {
    &.pcard-item-container {
      border: 1px dashed @primary-color;
    }

    .iconfont {
      color: @primary-color;
    }
  }

  .pcard-item-container {
    display: flex;
    justify-content: center;
    width: 240px;
    height: 330px;
    box-sizing: border-box;
    position: relative;
    // margin-top: -60px;
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
      transform: translate3d(0, -2px, 0);
      .header-mask {
        opacity: 1;
      }
    }
    .pic-container {
      height: 220px;
      width: 240px;
    }
    .data-container {
      margin: 10px 10px;
      .text {
        margin-top: 5px;
        font-weight: bold;
      }
      .date {
        margin-top: 3px;
        font-weight: lighter;
      }
    }
    .data-footer {
      width: 60%;
      justify-content: space-between;
      display: flex;
      font-weight: lighter;
      margin-left: 7px;
    }
    .header-mask {
      position: absolute;
      width: 100%;
      height: 330px;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.394);
      border-radius: 4px 4px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
      transition: top 0.28s ease, opacity 0.28s ease, height 0.28s ease;
      .details-btn {
        width: 170px;
        height:  170px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .func-section {
        margin-top: 20px;
        width: 70%;
        display: flex;
        text-align: center;
        flex-direction: row;
        justify-content: space-between;
        color: #fff;
        img {
          display: block;
          width: 25px;
          margin: 2px;
        }
      }
    }
  }
}
.items-title {
  padding: 2px;
  // background-color: green;
  height: 20px;
  margin-bottom: 10px;
}
.thumbnail-panel-btn {
  height: 36px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ::v-deep.el-button--mini {
    padding: 8px 20px;
  }
}
</style>
