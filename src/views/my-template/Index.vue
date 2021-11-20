<template>
  <div class="mytemp-wrapper">
    <!-- 用户创建的类别 -->
    <div class="mytemp-category">
      <el-radio-group
        class="mytemp-tabs"
        v-model="category"
        @change="changeCategory">
        <el-radio-button :label="undefined">
          默认
        </el-radio-button>
        <el-radio-button
          v-for="item of categoryList"
          :key="item.id"
          :label="item.id">
          {{ item.name }}
        </el-radio-button>
      </el-radio-group>
      <el-button @click="openDialog">创建类别</el-button>
    </div>
    <!-- 作品类型 -->
    <div class="mytemp-type">
      <el-tabs v-model="type" @tab-click="changeType">
        <el-tab-pane
          v-for="item of typeList"
          :key="item.number"
          :label="item.name"
          :name="item.number" />
      </el-tabs>
    </div>
    <!-- 作品列表，渲染数据 -->
    <div class="mytemp-container">
      <div v-for="item of templateList" :key="item.id">
        <TemplateCard :imgUrl="item.cover_image" :id="item.id" />
      </div>
    </div>

    <Dialog :show="showDialog" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import { TEMPLATE, CATEGORY } from '@apis/template';
import TemplateCard from '@comps/TemplateCard';
import Dialog from './components/Dialog';
export default {
  name: 'MyTemplate',
  components: {
    TemplateCard,
    Dialog
  },
  data() {
    return {
      category: undefined,
      type: '1',
      typeList: [
        {
          number: '1',
          name: 'H5'
        },
        {
          number: '2',
          name: '长页H5'
        }
      ],
      showDialog: false,
      categoryList: [],
      templateList: []
    };
  },
  async created() {
    const { category = undefined, page_mode: type = '1' } = this.$route.query;
    this.category = category;
    this.type = type;
    await this.getCategory();
    await this.getList();
  },
  methods: {
    // 打开创建类别
    openDialog() {
      this.showDialog = true;
    },
    // 关闭创建类别
    closeDialog() {
      this.showDialog = false;
      this.getCategory();
    },
    // 更改选中类别
    changeCategory(value) {
      this.changeRouter();
    },
    // 更改选中H5
    changeType() {
      this.changeRouter();
    },
    // 进行筛选后，需要改变路由
    changeRouter() {
      const { category, type } = this;
      const { category: routeCategory = undefined, page_mode: routeType = '1' } = this.$route.query;
      if (category === routeCategory && type === routeType) return;
      this.$router.replace({
        name: 'MyTemplate',
        query: {
          category,
          page_mode: type
        }
      });
      this.getList();
    },
    // 获取类别
    async getCategory() {
      const list = await this.$http.get(CATEGORY.LIST);
      const { categories } = list;
      this.categoryList = categories;
    },
    // 获取数据
    async getList() {
      const list = await this.$http.get(TEMPLATE.MY, {
        params: {
          page_mode: this.type,
          category_id: this.category
        }
      });
      const { pages } = list;
      const ids = pages.map(template => {
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
.mytemp-wrapper {
  padding: 1.2rem 3rem;
  .mytemp-category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .mytemp-type {
    margin-bottom: 20px;
    /deep/ .el-tabs__item {
      font-size: 16px;
    }
  }
  .mytemp-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
  }
}
</style>
