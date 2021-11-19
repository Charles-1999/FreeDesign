<template>
  <div class="component-tool">
    <el-tooltip content="复制" placement="left">
      <div class="tool-item" @click="copy">
        <fd-icon name="icon-fuzhi" :size="16" />
      </div>
    </el-tooltip>

    <el-tooltip content="删除" placement="left">
      <div class="tool-item" @click="remove">
        <fd-icon name="icon-shanchu" :size="16" />
      </div>
    </el-tooltip>

    <el-tooltip content="图层上移" placement="left">
      <div class="tool-item" @click="changeZIndex('up')">
        <fd-icon name="icon-wujieshejishigongju-1" :size="24" />
      </div>
    </el-tooltip>

    <el-tooltip content="图层下移" placement="left">
      <div class="tool-item" @click="changeZIndex('down')">
        <fd-icon name="icon-wujieshejishigongju-" :size="24" />
      </div>
    </el-tooltip>

    <el-tooltip content="图层置顶" placement="left">
      <div class="tool-item" @click="changeZIndex('top')">
        <fd-icon name="icon-layer" :size="16" />
      </div>
    </el-tooltip>

    <el-tooltip content="图层置底" placement="left">
      <div class="tool-item" @click="changeZIndex('bottom')">
        <fd-icon name="icon-layer" :size="16" />
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ComponentTool',

  computed: {
    ...mapGetters('editor', [
      'currElement'
    ])
  },

  methods: {
    copy() {
      const { currElement } = this;
      const { eleStyle } = currElement;

      const element = {
        ...currElement,
        uuid: Date.now(),
        eleStyle: {
          top: eleStyle.top + 20,
          left: eleStyle.left + 20
        }
      };

      this.$store.dispatch('editor/addElement', { element });
      this.$store.dispatch('editor/history/record');
    },

    remove() {
      const { uuid } = this.currElement;

      this.$store.dispatch('editor/removeElement', { uuid });
      this.$store.dispatch('editor/history/record');
    },

    changeZIndex(type) {
      const { uuid } = this.currElement;

      this.$store.dispatch('editor/changeZIndex', { uuid, type });
      this.$store.dispatch('editor/history/record');
    }
  }
};
</script>

<style lang="less" scoped>
.component-tool {
  position: fixed;
  right: 450px;
  top: 100px;
  width: 50px;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;
}

.tool-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;
}

.tool-item:hover {
  background-color: #dce9f4;
  color: #409EEF
}
</style>
