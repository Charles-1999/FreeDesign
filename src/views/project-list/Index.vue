<template>
  <div class="plist-wrapper">
    <div class="plist-container">
      <ProjectCard type="create" />
      <div
        v-for="item of projectList"
        :key="item.id">
        <ProjectCard
          :id="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCard from '../../components/ProjectCard.vue';

export default {
  name: 'ProjectList',

  components: {
    ProjectCard
  },

  data() {
    return {
      projectList: []
    };
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      const { pages } = await this.$http.get('/page/list', {
        params: {
          page_mode: '1'
        }
      });

      this.projectList = pages;
    }
  }
};
</script>

<style lang="less" scoped>
.plist-wrapper {
  padding: 1.2rem 3rem;
  .plist-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
  }
}
</style>
