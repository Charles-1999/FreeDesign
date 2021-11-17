<template>
  <div class="material-lib">
    <div class="title">素材库</div>
    <div class="material-list">
      <div class="material-item">
        1
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
      const res = await this.$http.get('/my_template/list');

      this.getDetail(res.pages.map(_ => _.id));
    },

    async getDetail(ids) {
      const res = await this.$http.post('/template/_mget', {
        ids
      });

      console.log(res);
    }
  }
};
</script>
