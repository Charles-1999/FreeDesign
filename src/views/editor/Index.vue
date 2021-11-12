<template>
  <div class="editor-wrapper">
    <fd-header>
      <div
        class="tool-bar"
        slot="page-header-middle">
        <div
          class="tool-item"
          @click="history('undo')">
          <i class="el-icon-refresh-left"></i>
          <span>撤销</span>
        </div>
        <div
          class="tool-item"
          @click="history('redo')">
          <i class="el-icon-refresh-right"></i>
          <span>重做</span>
        </div>
      </div>
    </fd-header>
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

  created() {
    document.onkeydown = (e) => {
      const { key, metaKey } = e;

      if (key === 'z' && metaKey) {
        this.history('undo');
      } else if (key === 'y' && metaKey) {
        this.history('redo');
      } else if (key === 'Delete') {
        this.focusList.forEach(uuid => {
          this.$store.commit('editor/DELETE_ELEMENT', uuid);
        });
      }
    };
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

    history(type) {
      this.$store.dispatch(`editor/history/${type}`);
    },

    addPage() {
      this.$store.dispatch('editor/addPage', {});
    }
  }
};
</script>

<style lang="less" scoped>
.tool-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .tool-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    padding: 5px;
    font-size: 13px;
    cursor: pointer;

    [class^=el-icon-] {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .tool-item:hover {
    color: #409EFF;
  }
}

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
