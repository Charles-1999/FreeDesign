<template>
  <el-dialog
    title="创建类别"
    :visible.sync="show"
    :before-close="close"
    width="400px"
    destroy-on-close
    center>
    <el-input v-model="name" placeholder="类别名" />
    <span slot="footer">
      <el-button type="primary" @click="create">确认创建</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { CATEGORY } from '@apis/template';

export default {
  name: 'Dialog',
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      name: ''
    };
  },
  methods: {
    async create() {
      const { name } = this;
      await this.$http.post(CATEGORY.CREATE, {
        name
      });
      this.name = '';
      this.$emit('closeDialog');
    },
    close(done) {
      this.name = '';
      this.$emit('closeDialog');
      done();
    }
  }
};
</script>

<style lang="less" scoped>

</style>
