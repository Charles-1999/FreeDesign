/**
 * 组件自动导入，将会扫描目录下所有组件进行注册
 * 组件用lib-前缀命名
 * 文件夹组件用index.js导出
 * 单文件组件直接导出
 */

const libComponents = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /([A-Z]\w+\.vue$)/
);

/**
 * 注册组件
 * @param {Object} Vue Vue
 * @param {Object} opts opts
 * @return {void}
 */
const install = (Vue, opts = {}) => {
  libComponents
    .keys()
    .forEach(fileName => {
      // 获取组件配置
      const componentsConfig = libComponents(fileName);

      // 获取组件的 PascalCase 命名
      // 获取和目录深度无关的文件名
      const componentName = (fileName
        .replace('/index.js', '')
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''))
        .toLowerCase();

      // 全局注册组件
      Vue.component(
        `lib-${componentName}`,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentsConfig.default || componentsConfig
      );
    });
};

export default {
  install
};
