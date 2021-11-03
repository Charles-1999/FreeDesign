<template>
  <div class="editor-wrapper">
    <div>
      <el-button
        type="primary"
        @click="addElement('text')">
        文本
      </el-button>
      <el-button
        type="primary"
        @click="addElement('rect')">
        矩形
      </el-button>
      <el-button
        type="primary"
        @click="history('undo')">
        undo
      </el-button>
      <el-button
        type="primary"
        @click="history('redo')">
        redo
      </el-button>
      <el-select
        v-model="$store.state.editor.currPageIdx">
        <el-option
          v-for="(item, idx) in projectData.pages"
          :key="idx"
          :label="idx"
          :value="idx">
        </el-option>
      </el-select>
      <el-button
        type="primary"
        @click="addPage">
        添加页面
      </el-button>
    </div>
    <div class="middle">
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
import PageEditor from './components/pageEditor/PageEditor.vue';
import AttrEditor from './components/attrEditor/AttrEditor.vue';
import AnimationEditor from './components/animationEditor/AnimationEditor.vue';

export default {
  name: 'Editor',

  components: {
    Canvas,
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

    const res = await this.$http.get('/page/list');
    console.log(res);
  },

  methods: {
    ...mapMutations('editor', [
      'SET_VALID_MOVE_AREA'
    ]),

    /**
     * 添加元素
     * @param {string} type type
     * @return {void}
     */
    addElement(type) {
      this.$store.dispatch({
        type: 'editor/addElement',
        element: {
          uuid: new Date().getTime(),
          component: type,
          eleStyle: {
            top: 50,
            left: 70
          }
        }
      });

      this.$store.dispatch('editor/history/record');
    },

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
  display: grid;
  grid-template-rows: 6rem 1fr;
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
}

.attr-editor-wrapper {
  width: 350px;
  padding: 0 20px;
}
</style>
