import devConfig from './config.dev';
import prodConfig from './config.prod';

// 默认配置
const defaultConfig = {
  // cos平台 七牛云
  cos: {
    uploadUrl: 'https://upload-z2.qiniup.com',
    queryUrl: 'http://r1zff9ii3.hn-bkt.clouddn.com/'
  }
};

const config = {
  dev: {
    ...defaultConfig,
    ...devConfig
  },

  prod: {
    ...defaultConfig,
    ...prodConfig
  }
};

export default process.env.NODE_ENV === 'production'
  ? config.prod
  : config.dev;
