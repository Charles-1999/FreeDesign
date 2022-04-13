<template>
  <div class="home-container">
    <div class="header">
      <div class="title">FreeDesign</div>
    </div>

    <!-- banner -->
    <el-carousel
      class="swiper-container"
      height="100%">
      <el-carousel-item
        :key="idx"
        v-for="(item, idx) in banner"
        class="banner-container">
        <div class="desc">
          <h1 class="wow animate__zoomInDown">{{ item.h1 }}</h1>
          <h2 class="wow animate__zoomInLeft">{{ item.h2 }}</h2>
          <p class="wow animate__zoomInUp">{{ item.content }}</p>
          <el-button
            class="wow animate__zoomInUp"
            data-wow-delay="1.8s"
            @click="$router.push({ path: '/home/template-list' })">开始体验</el-button>
        </div>
        <div class="pic wow animate__zoomInRight">
          <img :src="item.pic" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 介绍 -->
    <div class="intro-container">
      <div class="intro-item wow animate__fadeInLeftBig" data-wow-delay="0s">
        <div class="intro-item__title">
          <img :src="require('../../assets/images/img-drag.png')" alt="">
          简单易上手
        </div>
        <div class="intro-item__content">无需编写代码，简单拖拉拽操作，即可搭建出精美H5页面</div>
      </div>
      <div class="intro-item wow animate__fadeInUpBig" data-wow-delay="0.3s">
        <div class="intro-item__title">
          <img :src="require('../../assets/images/img-qrcode.png')" alt="">
          发布零成本
        </div>
        <div class="intro-item__content">创作完作品后，无需自己部署，一键快速发布生成链接和二维码。</div>
      </div>
      <div class="intro-item wow animate__fadeInRightBig" data-wow-delay="0.6s">
        <div class="intro-item__title">
          <img :src="require('../../assets/images/img-h5.png')" alt="">
          数据可监控
        </div>
        <div class="intro-item__content">发布后可以实时查看作品的浏览量、转发量等维度数据，助你分析流量。</div>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="search-container">
      <div class="search-comp">
        <el-input placeholder="快速搜索场景模板" v-model="keyword" />
        <el-button type="primary">搜索模板</el-button>
      </div>
      <div class="hot-search">
        <span>热门搜索：</span>
        <el-link
        :key="idx"
        v-for="(link, idx) in hotSearch"
        :underline="false"
        :href="link.url">
          {{ link.label }}
        </el-link>
      </div>
    </div>

    <!-- 介绍 -->
    <div class="intro-container-2 wow animate__bounceInUp">
      <h1>拖拉拽，简单操作</h1>
      <h2>完全零代码，高度可配置，所见即所得</h2>

      <div class="img-wrap">
        <img :src="require('../../assets/images/img-demo.png')" alt="">
      </div>
    </div>
    <div class="intro-container-2 wow animate__bounceInUp">
      <h1>加动画，栩栩如生</h1>
      <h2>数十种动画效果，并且可以配置时长、延迟和循环</h2>

      <div class="img-wrap mid">
        <img :src="require('../../assets/images/img-demo-animate.png')" alt="">
      </div>
    </div>
    <div class="intro-container-2 wow animate__bounceInUp">
      <h1>数据可视化</h1>
      <h2>多维度分析数据，助你落地数据驱动战略</h2>

      <div class="img-wrap">
        <img :src="require('../../assets/images/img-demo-data.png')" alt="">
      </div>
    </div>

    <!-- slogan -->
    <div class="intro-container-2">
      <h1>FreeDesign</h1>
      <h2>让H5制作，更Free，更方便。</h2>
       <el-button
        type="primary"
        @click="$router.push({ path: '/home' })">
        立即进入FreeDesign
      </el-button>
    </div>

    <div class="footer">
      仅供学习使用，非商业用途。
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  data() {
    return {
      keyword: '',

      banner: [{
        h1: 'FreeDesign',
        h2: '让H5制作，更方便。',
        content: '一个功能强大的H5可视化搭建平台。',
        pic: require('../../assets/images/img-phone.png')
      }, {
        h1: 'FreeDesign',
        h2: '简单易上手',
        content: '无需编写代码，简单拖拉拽操作，即可搭建出精美H5页面。',
        pic: require('../../assets/images/img-drag.png')
      }, {
        h1: 'FreeDesign',
        h2: '发布零成本',
        content: '创作完作品后，无需自己部署，一键快速发布生成链接和二维码。',
        pic: require('../../assets/images/img-qrcode.png')
      }, {
        h1: 'FreeDesign',
        h2: '数据可监控',
        content: '发布后可以实时查看作品的浏览量、转发量等维度数据，助你分析流量。',
        pic: require('../../assets/images/img-h5.png')
      }],

      hotSearch: [{
        url: '',
        label: '企业招聘h5'
      }, {
        url: '',
        label: '婚礼请柬'
      }, {
        url: '',
        label: '百日宴'
      }, {
        url: '',
        label: '开业邀请'
      }, {
        url: '',
        label: '产品介绍'
      }, {
        url: '',
        label: '招商'
      }, {
        url: '',
        label: '电子贺卡'
      }, {
        url: '',
        label: '劳动节'
      }, {
        url: '',
        label: '抗疫'
      }]
    };
  }
};
</script>

<style lang="less" scoped>
  @header-height: 80px;

  .home-container {
    width: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    width: 100%;
    height: @header-height;
    padding: 0 100px;
    background-color: @primary-color;
    z-index: 99;
    box-sizing: border-box;
    box-shadow: 0px 13px 35px -12px rgba(0, 0, 0, 15%);

    .title {
      font-family: tencent;
      font-size: 30px;
      color: #fff;
    }
  }

  .swiper-container {
    height: calc(100vh - @header-height);
    min-height: 500px;
  }

  .banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - @header-height);
    min-height: 500px;
    background: url('../../assets/images/bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .desc {
      margin-top: -@header-height;
      color: #fff;
      font-family: tencent;

      h1 {
        font-size: 80px;
        animation-delay: 0s;
      }

      h2 {
        font-size: 35px;
        animation-delay: 0.3s;
      }

      p {
        font-size: 25px;
        animation-delay: 0.6s;
      }
    }

    .pic {
      flex-shrink: 0;
      width: 300px;
      margin-left: 200px;
      margin-right: 100px;
      animation-delay: 0.9s;

      img {
        width: 100%;
        height: 100%;
      }
    }

    ::v-deep.el-button {
      height: 80px;
      margin-top: 20px;
      padding: 10px 80px 15px;
      font-size: 22px;
      font-family: tencent;
    }
  }

  .intro-container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-family: tencent;

    .intro-item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 250px;
      margin: 40px 80px;

      &__title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        color: @primary-color;
        font-size: 30px;
        font-weight: 500;

        img {
          width: 100px;
        }
      }

      &__content {
        font-size: 20px;
      }
    }
  }

  .search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ::v-deep.search-comp {
      display: flex;
      width: 600px;
      margin: 40px 0 20px;
      border: 1px solid @primary-color;
      border-radius: 50px;
      overflow: hidden;

      .el-input__inner {
        height: 100%;
        border: 0;
      }

      .el-button {
        padding: 15px 60px;
        border-radius: 50px;
        font-size: 18px;
      }
    }

    .hot-search {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      span {
        margin-right: 15px;
      }

      a {
        margin-right: 10px;
      }
    }
  }

  .intro-container-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
    font-family: tencent;

    h1 {
      font-size: 40px;
    }

    h2 {
      font-size: 25px;
      color: @font-color-gray;
    }

    ::v-deep.el-button {
      height: 80px;
      margin: 20px 0;
      padding: 10px 80px 15px;
      font-size: 22px;
      font-family: tencent;
    }

    .img-wrap {
      width: 50%;
      margin: 40px 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      &.mid {
        width: 40%;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    margin-top: 200px;
    background-color: @primary-color;
    color: #fff;
  }
</style>
