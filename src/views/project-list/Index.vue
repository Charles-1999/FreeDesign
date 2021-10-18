<template>
  <div class="plist-wrapper">
    <div class="plist-container">
      <ProjectCard type="create" />
      <div
        v-for="(item, index) of 19"
        :key="index">
        <ProjectCard />
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
