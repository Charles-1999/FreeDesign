<template>
  <div class="editor-wrapper">
    <fd-header>
      <div
        class="tool-bar"
        slot="page-header-middle">
        <div
          class="tool-item"
          @click="history('undo')">
          <fd-icon name='icon-chexiao' :size="20" />
          <span>撤销</span>
        </div>
        <div
          class="tool-item margin-right"
          @click="history('redo')">
          <fd-icon name='icon-redo' :size="20" />
          <span>重做</span>
        </div>
        <div
          class="tool-item"
          @click="playAnimation">
          <i class="el-icon-video-play"></i>
          <span>播放</span>
        </div>
        <div
          class="tool-item"
          @click="isPreview = true">
          <i class="el-icon-data-board"></i>
          <span>预览</span>
        </div>
        <div
          class="tool-item"
          @click="save">
          <i class="el-icon-upload"></i>
          <span>保存</span>
        </div>
        <div
          class="tool-item"
          @click="template">
          <i class="el-icon-document-checked"></i>
          <span>存为模版</span>
        </div>
        <div
          class="tool-item"
          @click="material">
          <i class="el-icon-save"></i>
          <span>存为素材</span>
        </div>
      </div>
    </fd-header>

    <div class="middle">
      <!-- 侧边栏 -->
      <el-tabs
        class="side-bar"
        tab-position="left"
        value="comp">
        <el-tab-pane name="comp">
          <span slot="label" class="side-bar__item">
            <i class="el-icon-menu" /> 组件
          </span>
          <ComponentLib />
        </el-tab-pane>
        <el-tab-pane name="page">
          <span slot="label" class="side-bar__item">
            <i class="el-icon-document-copy" /> 页面
          </span>
          <PageList />
        </el-tab-pane>
        <el-tab-pane name="material">
          <span slot="label" class="side-bar__item">
            <i class="el-icon-magic-stick" /> 素材
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
          <img :src="htmlUrl" v-show="isShow" />
          <Canvas
            ref="canvas" />
        </div>
        <ComponentTool v-if="focusList.length === 1" />

        <Shortcut />

        <Tips />
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
            <div v-else class="empty-wrap">
              <el-image class='empty' :src="require('@src/assets/images/img-empty.png')" />
              请选择要编辑的元素
            </div>
          </el-tab-pane>
          <el-tab-pane label="动画" name="animation">
            <AnimationEditor
              v-if="focusList.length === 1" />
            <div v-else class="empty-wrap">
              <el-image class='empty' :src="require('@src/assets/images/img-empty.png')" />
              请选择要编辑的元素
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 图片库 -->
    <fd-imglib />

    <Preview
      :drawer="isPreview"
      :id="id"
      @close="handlePreviewClose" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import html2canvas from 'html2canvas';
import { uploadCos } from '@utils/cos.service';
import EventBus from '@utils/eventBus';
import Canvas from './components/canvas/Canvas.vue';
import ComponentTool from './components/componentTool/ComponentTool.vue';
import ComponentLib from './components/componentLib/ComponentLibs.vue';
import PageList from './components/pageList/PageList.vue';
import PageEditor from './components/pageEditor/PageEditor.vue';
import MaterialLib from './components/materialLib/MaterialLib.vue';
import AttrEditor from './components/attrEditor/AttrEditor.vue';
import AnimationEditor from './components/animationEditor/AnimationEditor.vue';
import Preview from './components/preview/preview.vue';
import Shortcut from './components/shortcut/Shortcut.vue';
import Tips from './components/tips/Tips.vue';

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
    AnimationEditor,
    Preview,
    Shortcut,
    Tips
  },

  data() {
    return {
      id: undefined,
      currAttrEditor: 'page',
      isPreview: false,
      htmlUrl: '',
      isShow: false
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

  watch: {
    focusList(val) {
      // 当有选中元素时，显示属性编辑器
      this.currAttrEditor = val.length ? 'attr' : 'page';
    }
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
      const { pages, width, height, title } = await this.$http.get('/page/' + this.id);

      this.$store.commit('editor/UPDATE_PROJECT_DATA', {
        pages, width, height, title
      });

      this.$store.commit('editor/history/CLEAR_SNAPSHOT');
      this.$store.dispatch('editor/history/record');
    },

    /**
     * 页面键盘快捷键
     */
    editorListenerHandler() {
      document.onkeydown = (e) => {
        const { key, metaKey } = e;

        if (key === 'a' && metaKey) {
          // 全选
          const list = this.currPage.elements.map(_ => _.uuid);
          this.$store.commit('editor/SET_FOCUSLIST', list);

          // 禁用默认的事件
          return false;
        } else if (key === 'z' && metaKey) {
          this.history('undo');
        } else if (key === 'y' && metaKey) {
          this.history('redo');
        } else if (key === 'Delete') {
          this.focusList.forEach(uuid => {
            this.$store.dispatch('editor/removeElement', { uuid });
          });
        } else if (key === 'Escape') {
          this.$store.commit('editor/SET_FOCUSLIST', []);
        }
      };
    },

    /**
     * 画布外的点击事件
     */
    handleCanvasWrapperClick() {
      if (!this.focusList.length) return;

      this.$store.commit('editor/SET_FOCUSLIST', []);

      this.currAttrEditor = 'page';
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

      // 1. 获取截图
      const canvas = await html2canvas(this.$refs.canvasWrapper, {
        useCORS: true
      });

      // 2. 上传截图
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'project' + Date.now(), { type: 'image/png' });

        await uploadCos(file);

        const requestData = {
          page_mode: pageMode,
          pages: JSON.stringify(pages),
          title: title || '草稿',
          description: '',
          width,
          height,
          scale,
          cover_image: this.$config.cos.queryUrl + file.name
        };

        try {
        // 有id，就是修改
          if (this.id) {
            await this.$http.put('/page/' + id, requestData);
          } else {
          // 没id，新建页面
            const { id } = await this.$http.post('/page', requestData);
            this.id = id;
          }

          this.$message({ message: '保存成功', type: 'success' });
        } catch (err) {
          this.$message({ message: '保存失败，请重新尝试', type: 'error' });
        }
      });
    },

    async template() {
      await this.$http.post('/page/set_template/' + this.id, {
        // category_id: 2
        // TODO 选择保存到的分类，undefined为不分类，默认
      });
    },

    async material() {
      // 0. 清掉focusList
      this.$store.commit('editor/SET_FOCUSLIST', []);

      // 1. 获取截图
      const canvas = await html2canvas(this.$refs.canvasWrapper, {
        useCORS: true
      });

      // 2. 上传截图
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'material' + Date.now(), { type: 'image/png' });

        await uploadCos(file);

        // 3. 保存素材
        try {
          await this.$http.post('/material', {
            name: 'test' + Date.now(),
            content: JSON.stringify(this.currPage.elements),
            cover_image: this.$config.cos.queryUrl + file.name,
            is_free: true
          });

          this.$message({ message: '保存成功', type: 'success' });
        } catch (err) {
          this.$message({ message: '保存失败，请重新尝试', type: 'error' });
        }
      });
    },

    handlePreviewClose(val) {
      this.isPreview = val === undefined ? true : val;
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
    margin: 0 10px;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;

    [class^=el-icon-],
    .iconfont {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 3px;
    }
  }

  .tool-item:hover {
    color: @primary-color;
  }

  .tool-item.margin-right {
    margin-right: 80px;
  }
}

.editor-wrapper {
  height: 100vh;
}

.editor-main {
  flex: 1;
  position: relative;
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
  ::v-deep.el-tabs__item{
    height: auto;
    padding: 15px 20px;
    font-size: 16px;
    line-height: 20px;

    .side-bar__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      [class^='el-icon'] {
        font-size: 20px;
        margin-bottom: 5px;
      }
    }
  }

  ::v-deep.el-tabs__content {
    width: 230px;
    height: 100%;
    padding-right: 10px;

    .el-tab-pane {
      height: 100%;
    }
  }

  #pane-comp {
    background-image: url('../../assets/images/bg-web.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  #pane-page {
    background-image: url('../../assets/images/bg-page.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
  }

  #pane-material {
    background-image: url('../../assets/images/bg-sc.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
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

  .empty-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .empty {
      width: 200px;
    }
  }

  #pane-page {
    background-image: url('../../assets/images/bg-setting.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
  }
}
</style>
