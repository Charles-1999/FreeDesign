<template>
  <div class="tlist-wrapper">
    <div class="tlist-container">
      <section class="show-pic-container">
        <h3>热门场景</h3>
        <p>
          满足新媒体、市场营销、行政办公、电商淘宝、印刷物料等多个创意设计场景需求
        </p>
        <div
         @click="go"
          class="show-pic-container-item"
          v-for="(item, index) of templateList"
          :key="index">
          <el-image
            style="width: 240px; height: 240px"
            alt="cover"
            fit="contain"
            :src="item" />
        </div>
      </section>
      <section class="show-pic-container">
        <h3>尽情期待</h3>
        <!-- <p>
          满足新媒体、市场营销、行政办公、电商淘宝、印刷物料等多个创意设计场景需求
        </p>
        <div
          class="show-pic-container-item"
          v-for="(item, index) of templateList"
          :key="index">
          <el-image
            style="width: 240px; height: 240px"
            alt="cover"
            fit="contain"
            :src="item" />
        </div> -->
      </section>
    </div>
  </div>
</template>

<script>
import { TEMPLATE } from '@apis/index.js';
import ProjectCard from '@comps/ProjectCard';

const fakeImg = [
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.24.03.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.24.09.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.24.15.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.24.29.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.24.34.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.24.39.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.23.56.png',
  'https://cdn.jsdelivr.net/gh/Lavieenrose99/IvanPictureHouse/ivan-pic截屏2022-04-13 下午9.23.47.png'
];

export default {
  name: 'TemplateList',
  components: {
    ProjectCard
  },
  data() {
    return {
      templateList: fakeImg
    };
  },
  async created() {
    // const data = await this.getList();
  },
  methods: {
    async go() {
      this.$router.push({
        name: 'Editor'
      });
    },
    async getList() {
      const list = await this.$http.get(TEMPLATE.PUBLIC);
      const { templates } = list;
      const ids = templates.map((template) => {
        return template.id;
      });
      const mget = await this.$http.post(TEMPLATE.MGET, {
        ids
      });
      this.templateList = mget;
    }
  }
};
</script>

<style lang="less" scoped>
.show-pic-container {
  padding: 2vw 10vh;
  // background: #f5f8ff;
  h3 {
  font-family: tencent;
  min-height: 46px;
  font-size: 32px;
}
p {
   font-family: tencent;
  min-height: 22px;
  font-size: 16px;
  color: #666;
  margin-top: 12px;
}
  .show-pic-container-item {
    margin: 20px;
    display: inline-block;
    width: 240px;
    // border: 2px solid rgb(249, 249, 252);
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
      transform: translate3d(0, -2px, 0);
      // border: 2px solid blue;
    }
  }
}
</style>
