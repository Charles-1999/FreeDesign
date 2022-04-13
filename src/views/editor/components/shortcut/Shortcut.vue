<template>
  <!-- 快捷键tips -->
  <el-popover
    popper-class="shortcut-wrap"
    class="shortcut-wrap"
    trigger="manual"
    v-model="shortcutVisible"
    placement="bottom-start">
    <el-tag slot="reference" @click="shortcutVisible = !shortcutVisible">
      <fd-icon name="icon-jianpan" :size="20" />
      快捷键指南
    </el-tag>
    <div class="shortcut-container">
      <div
        class="shortcut"
        :key="idx"
        v-for="(item, idx) in config">
        <!-- 遍历code -->
        <span
          class="code-wrap"
          :key="index"
          v-for="(key, index) in item.keys">
          <span v-if="index >= 1">+</span>
          <code>{{ item.keys[index] }}</code>
        </span>
        <span class="label">{{ item.label }}</span>
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
        {
          keys: ['esc'],
          label: '取消选中'
        },
        {
          keys: ['delete'],
          label: '删除元素'
        },
        {
          keys: ['command', 'c'],
          label: '复制元素'
        },
        {
          keys: ['command', 'a'],
          label: '全选'
        },
        {
          keys: ['command', 'z'],
          label: '撤销'
        },
        {
          keys: ['command', 'y'],
          label: '重做'
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.shortcut-wrap {
  position: absolute;
  top: 20px;
  left: 20px;

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
.el-popover.shortcut-wrap {
  min-width: 200px;
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
      text-align: right;
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
