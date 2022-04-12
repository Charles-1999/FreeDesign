<template>
  <div class="page-list-wrap">
    <div class="page-list-header">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addPage()">
        添加页面
      </el-button>
    </div>
    <div class="page-list">
      <!-- 页面显示 -->
      <div
        class="page-wrap"
        :class="idx === currPageIdx && 'curr-page'"
        v-for="(page, idx) in projectData.pages"
        :key="idx"
        @mouseenter="mouseOnPage = idx"
        @mouseleave="mouseOnPage = -1">
        <div class="index">{{ idx + 1 }}</div>
        <div
          class="page-main"
          @click="handlePageClick(idx)">
          <Canvas
            :style="{
              zoom: zoom,
              width: projectData.width + 'px',
              height: projectData.height + 'px',
            }"
            :page="page"
            :preview="true" />
          <el-tooltip
            content="添加页面"
            placement="right">
            <el-button
              v-show="mouseOnPage === idx"
              size="mini"
              circle
              icon="el-icon-plus"
              @click.stop="addPage(idx)" />
          </el-tooltip>
        </div>
        <div
          class="btn-wrap">
          <el-tooltip
            content="复制页面"
            placement="right">
            <el-button
              size="mini"
              circle
              icon="el-icon-document-copy"
              @click.stop="copyPage(page, idx)"
              v-show="mouseOnPage === idx" />
          </el-tooltip>
           <el-tooltip
            content="删除页面"
            placement="right">
            <el-button
              size="mini"
              circle
              icon="el-icon-delete"
              @click.stop="deletePage(page)"
              v-show="mouseOnPage === idx" />
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Canvas from '../canvas/Canvas.vue';

export default {
  name: 'PageList',

  components: {
    Canvas
  },

  data() {
    return {
      mouseOnPage: -1
    };
  },

  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      currPageIdx: state => state.editor.currPageIdx
    }),

    zoom() {
      const { projectData } = this;
      const prevWidth = 120;

      return prevWidth / projectData.width;
    },

    translate() {
      const { projectData, zoom } = this;

      return {
        x: `-${(projectData.width - projectData.width * zoom) / 2}px`,
        y: `-${(projectData.height - projectData.height * zoom) / 2}px`
      };
    }
  },

  methods: {
    /**
     * 添加页面
     * @param idx 当前页面的索引
     */
    addPage(idx) {
      this.$store.dispatch('editor/addPage', {
        page: {},
        idx
      });
    },

    /**
     * 添加页面
     * @param page 当前页面
     * @param idx 当前页面的索引
     */
    copyPage(page, idx) {
      this.$store.dispatch('editor/copyPage', { page, idx });
    },

    /**
     * 删除页面
     * @param page 当前页面
     */
    deletePage(page) {
      this.$store.dispatch('editor/deletePage', page.uuid);
    },

    /**
     * 页面点击事件
     * @param idx 当前页面的索引
     */
    handlePageClick(idx) {
      this.$store.commit('editor/SET_CURR_PAGE_IDX', idx);
    }
  }
};
</script>

<style lang="less" scoped>
.page-list-wrap {
  // box-sizing: content-box;
  // overflow: auto;
  height: 98%;
}

.page-list-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-bottom: 1px solid #eee;
}

.page-list {
  height: calc(100% - 50px);
  overflow: scroll;
}

.page-wrap {
  display: flex;
  align-items: center;
  justify-content:space-around;
  margin: 15px 0 30px;

  .index {
    width: 26px;
    height: 26px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    line-height: 26px;
    color: #fff;
    box-sizing: border-box;
  }

  .page-main {
    position: relative;
    cursor: pointer;

    .el-button {
      width: 30px;
      height: 30px;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      border: 0;
      box-shadow: 0 0 4px 0 #ddd;
      color: #000;

      ::v-deep.el-icon-plus {
        font-weight: 700;
      }
    }

    .el-button:hover {
      background-color: #fff;
      color: @primary-color;
    }
  }

  .btn-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30px;

    .el-button+.el-button {
      margin-left: 0;
      margin-top: 10px;
    }
  }
}

.page-wrap.curr-page {
  .index {
    background-color: @primary-color;
  }

  .canvas {
    border: 1px solid @primary-color;
  }
}

</style>
