<template>
  <div class="material-lib">
    <div class="header">
      <el-tabs>
        <el-tab-pane label="推荐" />
        <el-tab-pane label="收藏" />
        <el-tab-pane label="已购" />
      </el-tabs>
      <el-input suffix-icon="el-icon-search" size="mini" placeholder="搜索模版" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ sort }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>综合</el-dropdown-item>
          <el-dropdown-item>最新</el-dropdown-item>
          <el-dropdown-item>最新</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ price }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>全部</el-dropdown-item>
          <el-dropdown-item>免费</el-dropdown-item>
          <el-dropdown-item>会员免费</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="material-list">
      <div
        class="material-item"
        v-for="material in materialList"
        :key="material.id"
        @click="handleItemClick(material.id)">
        <!-- {{ material.name }} -->
        <el-image :src="material.cover_image" fit="contain" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialLib',

  data() {
    return {
      materialList: [],

      sort: '排序',
      price: '价格'
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

      // 触发record操作记录
      this.$store.dispatch('editor/history/record');
    }
  }
};
</script>

<style lang="less" scoped>
.material-lib {
  height: 100%;
}

.header {
  height: 120px;

  .el-dropdown {
    margin: 10px 10px 10px 0;
  }

  .el-dropdown-link {
    cursor: pointer;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}

.material-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  height: calc(100% - 120px);
  overflow: auto;
}

.material-item {
  width: 110px;
  height: 110px;
  padding: 5px;
  margin-bottom: 8px;
  background-color: #f1f5f9;
  border-radius: 3px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;

  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
