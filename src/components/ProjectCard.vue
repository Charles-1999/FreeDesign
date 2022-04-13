<template>
  <div class="pcard-item-wrapper" @click="go">
    <el-card
      class="pcard-item-container"
      shadow="hover"
      :body-style="{ padding: 0 }">
      <i
        class="el-icon-circle-plus-outline"
        :style="{ fontSize: '100px', fontWeight: '100' }"
        v-if="id === undefined" />
      <div class="items-container" v-else>
        <el-image
          fit="cover"
          :src="
            imgUrl ||
            'https://cjztest-1302847834.cos.ap-nanjing.myqcloud.com/logos/v2-7f567cba4f40593f5bf288155a15aec7_720w.jpeg'
          "
          alt="cover" />
          <div class="items-title">标题</div>
        <div class="thumbnail-panel-btn">
          <div class="btn-wrapper"><el-button size="mini">编辑</el-button></div>
          <div class="btn-wrapper"><el-button size="mini">预览</el-button></div>
          <div class="btn-wrapper"><el-button size="mini" @click="deletePage($event,id)">删除</el-button></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',

  props: {
    imgUrl: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: Number,
      required: false,
      default: undefined
    },
    mode: {
      type: Number,
      required: true
    }
  },
  methods: {
    go() {
      this.$router.push({
        name: 'Editor',
        query: {
          id: this.id,
          page_mode: this.mode
        }
      });
    },
    deletePage(e, ids) {
      // console.log(id);
      e.stopPropagation();
      e.preventDefault();
      this.$alert('确定删除改页面吗', 'free design', {
        confirmButtonText: '确定',
        callback: async (ids) => {
          await this.$http.delete('/api/page/', {
            params: {
              pid: 30
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pcard-item-wrapper {
  margin: 2rem 1.5rem;
  cursor: pointer;

  .pcard-item-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 240px;
    box-sizing: border-box;

    ::v-deep.el-image {
      margin-top: 5px;
      width: 100%;
      height: 170px;
    }
  }
}
.items-title{
   padding: 2px;
  // background-color: green;
  height: 20px;
  margin-bottom: 10px;
}
.thumbnail-panel-btn {
  height: 36px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
      ::v-deep.el-button--mini {
        padding: 8px 20px;
    }
}
</style>
