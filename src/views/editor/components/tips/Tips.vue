<template>
  <!-- 快捷键tips -->
  <el-popover
    popper-class="tips-wrap"
    class="tips-wrap"
    trigger="manual"
    v-model="shortcutVisible"
    placement="bottom-end">
    <el-tag slot="reference" @click="shortcutVisible = !shortcutVisible">
      <fd-icon name="icon-jianpan" :size="20" />
      使用小Tips
    </el-tag>
    <div class="shortcut-container">
      <div
        class="shortcut"
        :key="idx"
        v-for="(item, idx) in config">
        <span class="label">{{ idx + 1 }}.{{ item }}</span>
      </div>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'Shortcut',

  mounted() {
    this.shortcutVisible = true;
  },

  data() {
    return {
      shortcutVisible: false,

      config: [
        '按着command键的同时选择元素可以多选',
        '可以多选元素进行同时移动'
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.tips-wrap {
  position: absolute;
  bottom: 20px;
  right: 20px;

  ::v-deep.el-tag {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100px;
  }
}
</style>

<style lang="less">
/* 快捷键tips */
.el-popover.tips-wrap {
  .shortcut {
    display: flex;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .code-wrap {
      span {
        margin: 0 10px;
      }
    }

    .label {
      flex: 1;
    }
  }

  code {
    display: inline-block;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    padding: 0 3px;
    color: @primary-color;
    font-size: 12px;
    margin-right: 3px;
  }
}
</style>
