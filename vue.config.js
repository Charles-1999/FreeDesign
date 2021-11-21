const path = require('path');

module.exports = {
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://120.24.151.34:8000', // 代理接口地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        },
        '/qiniu': {
          target: 'https://upload-z2.qiniup.com',
          changeOrigin: true,
          pathRewrite: {
            '^/qiniu': ''
          }
        }
      }
    }
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@src', path.resolve('src'))
      .set('@config', path.resolve('config'))
      .set('@comps', path.resolve('src/components'))
      .set('@utils', path.resolve('src/utils'))
      .set('@apis', path.resolve('src/apis'));
  }
};
