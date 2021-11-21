<template>
  <div class="material-lib">
    <div class="title">素材库</div>
    <div class="material-list">
      <div
        class="material-item"
        v-for="material in materialList"
        :key="material.id"
        @click="handleItemClick(material.id)">
        {{ material.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialLib',

  data() {
    return {
      materialList: []
    };
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      const res = await this.$http.get('/material/list');

      this.getDetail(res.materials.map(_ => _.id));
    },

    async getDetail(ids) {
      const res = await this.$http.post('/material/_mget', {
        ids
      });

      this.materialList = res;
    },

    handleItemClick(id) {
      const { materialList } = this;

      const material = materialList.find(_ => _.id === id);

      material.content
        .forEach(element => {
          this.$store.dispatch('editor/addElement', { element });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.material-item {
  cursor: pointer;
}
</style>
