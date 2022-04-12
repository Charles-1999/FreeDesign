<template>
  <div class="plist-wrapper">
    <el-radio-group class="plist-tabs" v-model="type" @change="changeType">
      <el-radio-button label="H5">H5</el-radio-button>
      <el-radio-button label="LongPage">长页H5</el-radio-button>
    </el-radio-group>
    <div class="plist-container">
      <ProjectCard :mode="mode" />
      <div v-for="item of projectList" :key="item.id">
        <ProjectCard :imgUrl="item.cover_image" :id="item.id" :mode="mode" />
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
import ProjectCard from '../../components/ProjectCard';
export default {
  name: 'ProjectList',

  components: {
    ProjectCard
  },

  data() {
    return {
      projectList: [],
      total: 0,
      type: 'H5',
      mode: 1,
      typeList: [
        {
          number: 1,
          name: 'H5'
        },
        {
          number: 2,
          name: 'LongPage'
        }
      ]
    };
  },

  created() {
    const { type = 'H5' } = this.$route.query;
    this.type = type;
    this.mode = this.typeList.find((obj) => {
      return obj.name === this.type;
    }).number;
    this.getList();
  },

  methods: {
    async getList(id = 1) {
      const { pages, total } = await this.$http.get('/page/list', {
        params: {
          page_mode: this.mode,
          limit: 13,
          page: id
        }
      });

      this.projectList = pages;
      this.total = total;
    },
    changeType(value) {
      this.$router.replace({
        name: 'ProjectList',
        query: {
          type: value
        }
      });
      this.getList();
    },
    changePage(id) {
      this.getList(id);
    }
  },
  watch: {
    type() {
      this.mode = this.typeList.find((obj) => {
        return obj.name === this.type;
      }).number;
    }
  }
};
</script>

<style lang="less" scoped>
.plist-wrapper {
  padding: 1.2rem 3rem;
  .plist-tabs {
    margin-bottom: 20px;
    margin-left: 15px;
  }
  .plist-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
  }
}
</style>
