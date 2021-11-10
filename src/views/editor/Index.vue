<template>
  <div class="editor-wrapper">
    <fd-header />
    <div class="middle">
      <!-- 侧边栏 -->
      <el-tabs
        class="side-bar"
        tab-position="left"
        value="page">
        <el-tab-pane name="comp">
          <span slot="label">
            <i></i> 基础组件
          </span>
          <ComponentLib />
        </el-tab-pane>
        <el-tab-pane name="page">
          <span slot="label">
            <i></i> 页面管理
          </span>
          <PageList />
        </el-tab-pane>
      </el-tabs>

      <!-- 页面编辑区 -->
      <div class="editor-main">
        <div
          class="editor-canvas-wrapper"
          :style="{
            transform: 'scale(' + projectData.scale + ')',
            width: projectData.width + 'px',
            height: projectData.height + 'px',
          }"
          ref="canvasWrapper"
          @click.self="handleCanvasWrapperClick">
          <Canvas />
        </div>
      </div>

      <!-- 属性编辑区 -->
      <div class="attr-editor-wrapper">
        <el-tabs value="page">
          <el-tab-pane label="页面" name="page">
            <PageEditor />
          </el-tab-pane>
          <el-tab-pane label="属性" name="attr">
            <AttrEditor
              v-if="focusList.length === 1" />
            <div v-else>
              请选择要编辑的元素
            </div>
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation">
            <AnimationEditor
              v-if="focusList.length === 1" />
            <div v-else>
              请选择要编辑的元素
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

import Canvas from './components/canvas/Canvas.vue';
import ComponentLib from './components/componentLib/ComponentLibs.vue';
import PageList from './components/pageList/PageList.vue';
import PageEditor from './components/pageEditor/PageEditor.vue';
import AttrEditor from './components/attrEditor/AttrEditor.vue';
import AnimationEditor from './components/animationEditor/AnimationEditor.vue';

export default {
  name: 'Editor',

  components: {
    Canvas,
    ComponentLib,
    PageList,
    PageEditor,
    AttrEditor,
    AnimationEditor
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList,
      projectData: state => state.editor.projectData,
      currPageIdx: state => state.editor.currPageIdx
    }),
    ...mapGetters('editor', [
      'getElementByUUID'
    ])
  },

  async mounted() {
    // 设置有效的拖拉拽区域
    this.SET_VALID_MOVE_AREA(this.$refs.canvasWrapper);
  },

  methods: {
    ...mapMutations('editor', [
      'SET_VALID_MOVE_AREA'
    ]),

    handleCanvasWrapperClick() {
      this.$store.commit('editor/SET_FOCUSLIST', []);
    },

    async history(type) {
      await this.$store.dispatch(`editor/history/${type}`);
    },

    addPage() {
      this.$store.dispatch('editor/addPage', {});
    }
  }
};
</script>

<style lang="less" scoped>
.editor-wrapper {
  height: 100vh;
}

.editor-main {
  flex: 1;
  background-color: #efefef;
}

.editor-canvas-wrapper {
  margin: 25px auto;
  background: #fff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==);
}

.middle {
  display: flex;
  height: calc(100vh - 6rem);
}

.side-bar {
  ::v-deep.el-tabs__content {
    width: 210px;
    height: 100%;

    .el-tab-pane {
      height: 100%;
    }
  }
}

.attr-editor-wrapper {
  width: 350px;
  padding: 0 20px;
}
</style>
