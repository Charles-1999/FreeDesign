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
        <div
          class="tool-item"
          @click="playAnimation">
          <i class="el-icon-refresh-right"></i>
          <span>播放</span>
        </div>
        <div
          class="tool-item"
          @click="save">
          <i class="el-icon-save"></i>
          <span>保存</span>
        </div>
        <div
          class="tool-item"
          @click="template">
          <i class="el-icon-save"></i>
          <span>存为模版</span>
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
            <i></i> 组件
          </span>
          <ComponentLib />
        </el-tab-pane>
        <el-tab-pane name="page">
          <span slot="label">
            <i></i> 页面
          </span>
          <PageList />
        </el-tab-pane>
        <el-tab-pane name="material">
          <span slot="label">
            <i></i> 素材
          </span>
          <MaterialLib />
        </el-tab-pane>
      </el-tabs>

      <!-- 页面编辑区 -->
      <div
        class="editor-main"
        @click.self="handleCanvasWrapperClick">
        <div
          class="editor-canvas-wrapper"
          :style="{
            transform: 'scale(' + projectData.scale + ')',
            width: projectData.width + 'px',
            height: projectData.height + 'px',
          }"
          ref="canvasWrapper">
          <Canvas
            @element-active-change="handleElementActiveChange" />
        </div>
        <ComponentTool />
      </div>

      <!-- 属性编辑区 -->
      <div class="attr-editor-wrapper">
        <el-tabs v-model="currAttrEditor">
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

    <!-- 图片库 -->
    <fd-imglib />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import EventBus from '@utils/eventBus';

import Canvas from './components/canvas/Canvas.vue';
import ComponentTool from './components/componentTool/ComponentTool.vue';
import ComponentLib from './components/componentLib/ComponentLibs.vue';
import PageList from './components/pageList/PageList.vue';
import PageEditor from './components/pageEditor/PageEditor.vue';
import MaterialLib from './components/materialLib/MaterialLib.vue';
import AttrEditor from './components/attrEditor/AttrEditor.vue';
import AnimationEditor from './components/animationEditor/AnimationEditor.vue';

export default {
  name: 'Editor',

  components: {
    Canvas,
    ComponentTool,
    ComponentLib,
    PageList,
    PageEditor,
    MaterialLib,
    AttrEditor,
    AnimationEditor
  },

  data() {
    return {
      id: undefined,

      currAttrEditor: 'page'
    };
  },

  computed: {
    ...mapState({
      focusList: state => state.editor.focusList,
      projectData: state => state.editor.projectData,
      currPageIdx: state => state.editor.currPageIdx
    }),
    ...mapGetters('editor', [
      'getElementByUUID',
      'currPage'
    ])
  },

  created() {
    const { id } = this.$route.query;
    this.id = Number(id);

    // 初始化
    this.init();

    this.editorListenerHandler();
  },

  async mounted() {
    // 设置有效的拖拉拽区域
    this.SET_VALID_MOVE_AREA(this.$refs.canvasWrapper);
  },

  methods: {
    ...mapMutations('editor', [
      'SET_VALID_MOVE_AREA'
    ]),

    /**
     * 初始化
     */
    init() {
      const { id } = this;

      // 默认打开第一个页面
      this.$store.commit('editor/SET_CURR_PAGE_IDX', 0);
      // 清空选中的元素
      this.$store.commit('editor/SET_FOCUSLIST', []);

      // 如果有id，获取项目数据
      if (id) {
        this.getProjectData();
        return;
      }

      // 初始化项目数据
      this.$store.commit('editor/INIT_PROJECT_DATA');
    },

    /**
     * 获取项目数据
     */
    async getProjectData() {
      const { pages, width, height } = await this.$http.get('/page/' + this.id);

      this.$store.commit('editor/UPDATE_PROJECT_DATA', {
        pages, width, height
      });
    },

    /**
     * 页面键盘快捷键
     */
    editorListenerHandler() {
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

    /**
     * 画布外的点击事件
     */
    handleCanvasWrapperClick() {
      this.$store.commit('editor/SET_FOCUSLIST', []);

      this.currAttrEditor = 'page';
    },

    /**
     * 元素焦点change事件
     */
    handleElementActiveChange() {
      const { focusList } = this;

      this.currAttrEditor = focusList.length ? 'attr' : 'page';
    },

    /**
     * 处理操作记录，undo,redo
     */
    history(type) {
      this.$store.dispatch(`editor/history/${type}`);
    },

    playAnimation() {
      const { currPage } = this;

      currPage.elements.forEach(ele => {
        EventBus.$emit('RunAnimation', ele.uuid, ele.animations);
      });
    },

    /**
     * 保存项目
     */
    async save() {
      const { id, projectData } = this;
      const { pageMode, pages, title, height, width, scale } = projectData;

      const requestData = {
        page_mode: pageMode,
        pages: JSON.stringify(pages),
        title,
        description: '',
        width,
        height,
        scale
      };

      try {
        // 有id，就是修改
        if (this.id) {
          await this.$http.put('/page/' + id, requestData);
        } else {
          // 没id，新建页面
          await this.$http.post('/page', requestData);
        }

        this.$message({ message: '保存成功', type: 'success' });
      } catch (err) {
        this.$message({ message: '保存失败，请重新尝试', type: 'error' });
      }
    },

    async template() {
      await this.$http.post('/page/set_template/' + this.id, {
        category_id: 2
      });
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
  width: 100%;
  overflow: auto;
  background-color: #efefef;
}

.editor-canvas-wrapper {
  margin: 25px auto;
  background: #fff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZAgMAAAC5h23wAAAAAXNSR0IB2cksfwAAAAlQTFRF9fX18PDwAAAABQ8/pgAAAAN0Uk5T/yIA41y2EwAAABhJREFUeJxjYIAC0VAQcGCQWgUCDUONBgDH8Fwzu33LswAAAABJRU5ErkJggg==);
}

.middle {
  display: flex;
  height: calc(100vh - 60px);
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

  ::v-deep.el-tabs {
    height: 100%;

    .el-tabs__content {
      height: calc(100% - 55px);

      .el-tab-pane {
        height: 100%;
      }
    }
  }

  ::v-deep.title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>
