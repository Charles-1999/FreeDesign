<template>
  <div class="home-container">
    <div class="header">
      <div class="title">FreeDesign</div>
    </div>
    <!-- banner -->
    <div class="banner-container">
      <div class="desc">
        <h1 class="wow animate__zoomInDown">FreeDesign</h1>
        <h2 class="wow animate__zoomInLeft">让H5制作，更方便。</h2>
        <p class="wow animate__zoomInUp">一个功能强大的H5可视化搭建平台。</p>
        <el-button>开始体验</el-button>
      </div>
      <div class="pic wow animate__zoomInRight">
        <img :src="require('../../assets/images/img-phone.png')" alt="">
      </div>
    </div>

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
          简单易上手
        </div>
        <div class="intro-item__content">无需编写代码，仅需拖拉拽组件，即可搭建出精美H5页面</div>
      </div>
    </div>
  </div>
</template>

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

    .title {
      font-family: tencent;
      font-size: 30px;
      color: #fff;
    }
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
        font-size: 25px;
        font-weight: 500;

        img {
          width: 100px;
        }
      }

      &__content {
        font-size: 18px;
      }
    }
  }
</style>
