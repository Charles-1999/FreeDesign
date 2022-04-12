<template>
  <div class="component-lib-wrap">
    <div
      class="comp-group"
      v-for="(type, idx) in compList"
      :key="idx">
      <div class="group-title">{{ type.label }}</div>
      <div class="comp-list">
        <div
          class="comp-wrap"
          v-for="(comp, key) in type.children"
          :key="key"
          @click="addElement(key)">
          <fd-icon
            :name='comp.icon'
            :size='comp.size' />
          <span class="label">{{ comp.label }}</span>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import { compList } from './config';

export default {
  name: 'ComponentLib',

  data() {
    return {
      compList
    };
  },

  created() {

  },

  methods: {
    /**
     * 添加元素
     * @param {string} type type
     * @return {void}
     */
    addElement(type) {
      const uuid = new Date().getTime();
      this.$store.dispatch('editor/addElement', {
        element: {
          uuid,
          component: type,
          eleStyle: {
            top: 50,
            left: 70
          }
        }
      });

      this.$store.dispatch('editor/history/record');
    }
  }
};
</script>

<style lang="less" scoped>
.group-title {
  margin: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid @color-shadow;
}

.comp-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
}

.comp-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 60px;
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  font-size: 14px;
  overflow: hidden;
  cursor: pointer;

  .iconfont {
    flex: 1;
  }

  .label {
    width: 100%;
    padding: 3px 0;
    text-align: center;
    background-color: rgba(244, 244, 244, 0.5);
  }
}

.comp-wrap:hover {
  border-color: @primary-color;
  color: @primary-color;
}

.comp-wrap:nth-child(2n) {
  margin-right: 0;
}
</style>
