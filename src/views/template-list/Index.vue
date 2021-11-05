<template>
  <div class="tlist-wrapper">
    <div class="tlist-container">
      <div
        v-for="(item, index) of templateList"
        :key="index">
        <ProjectCard :imgUrl="item.cover_image" />
      </div>
    </div>
  </div>
</template>

<script>
import { TEMPLATE } from '@apis/index.js';
import ProjectCard from '@comps/ProjectCard';

export default {
  name: 'TemplateList',
  components: {
    ProjectCard
  },
  data() {
    return {
      templateList: []
    };
  },
  mounted() {
    const getList = async () => {
      const list = await this.$http.get(TEMPLATE.PUBLIC);
      const { templates } = list;
      const ids = templates.map((template) => {
        return template.id;
      });
      console.log(ids);
      const mget = await this.$http.post(TEMPLATE.MGET, {
        ids
      });
      console.log(mget);
      this.templateList = mget;
    };
    getList();
  }
};
</script>

<style lang="less" scoped>

</style>
