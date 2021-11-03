module.exports = {
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://120.24.151.34:8000', // 代理接口地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
