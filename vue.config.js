const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js'
      // 模板来源
    //   template: 'public/index.html',
    //   // 在 dist/index.html 的输出
    //   filename: 'index.html',
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: 'Index Page',
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   chunks: ['chunk-vendors', 'chunk-common', 'index']
    // },
    // // 当使用只有入口的字符串格式时，
    // // 模板会被推导为 `public/subpage.html`
    // // 并且如果找不到的话，就回退到 `public/index.html`。
    // // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
    }
  },
  devServer: {
    port: 7777,
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
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      html2canvas: 'html2canvas'
    },
    plugins: [
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   openAnalyzer: false
      // })
    ]
  },
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
